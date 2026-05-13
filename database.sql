CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,
    category_id INTEGER,

    amount DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,

    type VARCHAR(20) NOT NULL
    CHECK (type IN ('income', 'expense')),

    transaction_date DATE DEFAULT CURRENT_DATE,

    ai_confidence DECIMAL(5,2),

    note TEXT,

    is_deleted BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_transaction_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_transaction_category
        FOREIGN KEY(category_id)
        REFERENCES categories(category_id)
        ON DELETE SET NULL
);


CREATE TABLE budgets (
    budget_id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    category_id INTEGER,

    amount DECIMAL(10,2) NOT NULL,

    month INTEGER NOT NULL,
    year INTEGER NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_budget_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_budget_category
        FOREIGN KEY(category_id)
        REFERENCES categories(category_id)
        ON DELETE SET NULL
);


CREATE TABLE insights (
    insight_id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    month INTEGER NOT NULL,
    year INTEGER NOT NULL,

    total_spending DECIMAL(10,2),

    recommendation TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_insight_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);