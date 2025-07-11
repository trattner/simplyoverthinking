DROP TABLE IF EXISTS subscribers;

CREATE TABLE subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    ip_address TEXT,
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'active'
);

CREATE INDEX idx_subscriber_email ON subscribers(email);
CREATE INDEX idx_subscribed_at ON subscribers(subscribed_at);
CREATE INDEX idx_status ON subscribers(status);