import { foreignKey, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: integer().primaryKey().generatedByDefaultAsIdentity({
		name: 'users_id_seq',
		startWith: 1,
		increment: 1,
		cache: 1
	}),
	username: text('username').notNull().unique(),
	password: text('password').notNull()
});

export const sessions = pgTable(
	'sessions',
	{
		id: integer().primaryKey().generatedByDefaultAsIdentity({
			name: 'sessions_id_seq',
			startWith: 1,
			increment: 1,
			cache: 1
		}),
		userSessions: integer('user_sessions').notNull(),
		sessionId: text('session_id').notNull(),
		expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
	},
	(table) => {
		return {
			sessionsUsersSessions: foreignKey({
				columns: [table.userSessions],
				foreignColumns: [users.id],
				name: 'sessions_users_sessions'
			})
		};
	}
);

export type Session = typeof sessions.$inferSelect;

export type User = typeof users.$inferSelect;
