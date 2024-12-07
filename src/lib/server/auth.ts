import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	return encodeBase64url(bytes);
}

export async function createSession(token: string, userId: number) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	return await db
		.insert(table.sessions)
		.values({ userSessions: userId, sessionId, expiresAt: new Date(Date.now() + DAY_IN_MS * 30) })
		.returning();
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const [result] = await db
		.select({
			// Adjust user table here to tweak returned data
			user: { id: table.users.id, username: table.users.username },
			session: table.sessions
		})
		.from(table.sessions)
		.innerJoin(table.users, eq(table.sessions.userSessions, table.users.id))
		.where(eq(table.sessions.sessionId, sessionId));

	if (!result) {
		return { session: null, user: null };
	}
	const { session, user } = result;

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(table.sessions).where(eq(table.sessions.sessionId, session.sessionId));
		return { session: null, user: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(table.sessions)
			.set({ expiresAt: session.expiresAt })
			.where(eq(table.sessions.sessionId, session.sessionId));
	}

	return { session, user };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	await db.delete(table.sessions).where(eq(table.sessions.sessionId, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}
