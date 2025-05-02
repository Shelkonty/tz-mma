-- src/database/seed.sql

-- Only add weight classes if they don't already exist
INSERT INTO weight_classes (id, name, weight_limit, gender)
SELECT 13, 'Flyweight', 125.00, 'Male'
    WHERE NOT EXISTS (SELECT 1 FROM weight_classes WHERE id = 13);

INSERT INTO weight_classes (id, name, weight_limit, gender)
SELECT 14, 'Bantamweight', 135.00, 'Male'
    WHERE NOT EXISTS (SELECT 1 FROM weight_classes WHERE id = 14);

INSERT INTO weight_classes (id, name, weight_limit, gender)
SELECT 15, 'Featherweight', 145.00, 'Male'
    WHERE NOT EXISTS (SELECT 1 FROM weight_classes WHERE id = 15);

INSERT INTO weight_classes (id, name, weight_limit, gender)
SELECT 16, 'Lightweight', 155.00, 'Male'
    WHERE NOT EXISTS (SELECT 1 FROM weight_classes WHERE id = 16);

INSERT INTO weight_classes (id, name, weight_limit, gender)
SELECT 17, 'Welterweight', 170.00, 'Male'
    WHERE NOT EXISTS (SELECT 1 FROM weight_classes WHERE id = 17);

INSERT INTO weight_classes (id, name, weight_limit, gender)
SELECT 18, 'Middleweight', 185.00, 'Male'
    WHERE NOT EXISTS (SELECT 1 FROM weight_classes WHERE id = 18);

INSERT INTO weight_classes (id, name, weight_limit, gender)
SELECT 19, 'Light Heavyweight', 205.00, 'Male'
    WHERE NOT EXISTS (SELECT 1 FROM weight_classes WHERE id = 19);

INSERT INTO weight_classes (id, name, weight_limit, gender)
SELECT 20, 'Heavyweight', 265.00, 'Male'
    WHERE NOT EXISTS (SELECT 1 FROM weight_classes WHERE id = 20);

INSERT INTO weight_classes (id, name, weight_limit, gender)
SELECT 21, 'Women''s Strawweight', 115.00, 'Female'
    WHERE NOT EXISTS (SELECT 1 FROM weight_classes WHERE id = 21);

INSERT INTO weight_classes (id, name, weight_limit, gender)
SELECT 22, 'Women''s Flyweight', 125.00, 'Female'
    WHERE NOT EXISTS (SELECT 1 FROM weight_classes WHERE id = 22);

INSERT INTO weight_classes (id, name, weight_limit, gender)
SELECT 23, 'Women''s Bantamweight', 135.00, 'Female'
    WHERE NOT EXISTS (SELECT 1 FROM weight_classes WHERE id = 23);

INSERT INTO weight_classes (id, name, weight_limit, gender)
SELECT 24, 'Women''s Featherweight', 145.00, 'Female'
    WHERE NOT EXISTS (SELECT 1 FROM weight_classes WHERE id = 24);

-- Add fighters with correct weight_class_id references
INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Deiveson', 'Figueiredo', 13, 'Brazil', 'Team Figueiredo', 21, 2, 9, 8
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Deiveson' AND last_name = 'Figueiredo');

INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Brandon', 'Moreno', 13, 'Mexico', 'Entram Gym', 20, 6, 5, 11
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Brandon' AND last_name = 'Moreno');

INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Alexandre', 'Pantoja', 13, 'Brazil', 'American Top Team', 25, 5, 8, 9
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Alexandre' AND last_name = 'Pantoja');

INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Askar', 'Askarov', 13, 'Russia', 'Berkut MMA', 14, 1, 3, 8
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Askar' AND last_name = 'Askarov');

-- Bantamweight
INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Aljamain', 'Sterling', 14, 'United States', 'Serra-Longo Fight Team', 22, 3, 3, 8
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Aljamain' AND last_name = 'Sterling');

INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Petr', 'Yan', 14, 'Russia', 'Tiger Muay Thai', 16, 4, 7, 1
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Petr' AND last_name = 'Yan');

INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Sean', 'O''Malley', 14, 'United States', 'MMA Lab', 16, 1, 11, 1
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Sean' AND last_name = 'O''Malley');

INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Marlon', 'Vera', 14, 'Ecuador', 'Team Oyama', 20, 8, 8, 9
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Marlon' AND last_name = 'Vera');

-- Featherweight
INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Alexander', 'Volkanovski', 15, 'Australia', 'City Kickboxing', 25, 2, 12, 3
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Alexander' AND last_name = 'Volkanovski');

INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Max', 'Holloway', 15, 'United States', 'Hawaii Elite MMA', 24, 7, 11, 2
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Max' AND last_name = 'Holloway');

INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Brian', 'Ortega', 15, 'United States', 'Rener Gracie Jiu-Jitsu', 15, 3, 4, 7
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Brian' AND last_name = 'Ortega');

INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Yair', 'Rodriguez', 15, 'Mexico', 'Striking MMA', 14, 4, 5, 3
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Yair' AND last_name = 'Rodriguez');

-- Lightweight
INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Islam', 'Makhachev', 16, 'Russia', 'Eagle MMA', 23, 1, 4, 10
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Islam' AND last_name = 'Makhachev');

INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Charles', 'Oliveira', 16, 'Brazil', 'Chute Boxe', 33, 9, 9, 21
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Charles' AND last_name = 'Oliveira');

INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Dustin', 'Poirier', 16, 'United States', 'American Top Team', 29, 7, 14, 8
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Dustin' AND last_name = 'Poirier');

INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Justin', 'Gaethje', 16, 'United States', 'ONX Sports', 24, 4, 19, 1
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Justin' AND last_name = 'Gaethje');

-- Welterweight
INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Leon', 'Edwards', 17, 'United Kingdom', 'UTC', 20, 3, 7, 3
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Leon' AND last_name = 'Edwards');

INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Kamaru', 'Usman', 17, 'Nigeria', 'ONX Sports', 20, 3, 9, 1
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Kamaru' AND last_name = 'Usman');

INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Colby', 'Covington', 17, 'United States', 'MMA Masters', 17, 3, 4, 4
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Colby' AND last_name = 'Covington');

INSERT INTO fighters (first_name, last_name, weight_class_id, nationality, team, wins, losses, knockouts, submissions)
SELECT 'Belal', 'Muhammad', 17, 'United States', 'Roufusport', 22, 3, 5, 1
    WHERE NOT EXISTS (SELECT 1 FROM fighters WHERE first_name = 'Belal' AND last_name = 'Muhammad');

-- Add events
INSERT INTO events (name, date, location, venue)
SELECT 'UFC 290', '2023-07-08', 'Las Vegas, Nevada', 'T-Mobile Arena'
    WHERE NOT EXISTS (SELECT 1 FROM events WHERE name = 'UFC 290');

INSERT INTO events (name, date, location, venue)
SELECT 'UFC 291', '2023-07-29', 'Salt Lake City, Utah', 'Delta Center'
    WHERE NOT EXISTS (SELECT 1 FROM events WHERE name = 'UFC 291');

INSERT INTO events (name, date, location, venue)
SELECT 'UFC 292', '2023-08-19', 'Boston, Massachusetts', 'TD Garden'
    WHERE NOT EXISTS (SELECT 1 FROM events WHERE name = 'UFC 292');

INSERT INTO events (name, date, location, venue)
SELECT 'UFC 293', '2023-09-09', 'Sydney, Australia', 'Qudos Bank Arena'
    WHERE NOT EXISTS (SELECT 1 FROM events WHERE name = 'UFC 293');

INSERT INTO events (name, date, location, venue)
SELECT 'UFC 294', '2023-10-21', 'Abu Dhabi, UAE', 'Etihad Arena'
    WHERE NOT EXISTS (SELECT 1 FROM events WHERE name = 'UFC 294');

INSERT INTO events (name, date, location, venue)
SELECT 'UFC 300', '2024-04-13', 'Las Vegas, Nevada', 'T-Mobile Arena'
    WHERE NOT EXISTS (SELECT 1 FROM events WHERE name = 'UFC 300');

-- Add simple fights (avoiding complex PL/pgSQL blocks)
-- First get the fighter IDs
CREATE TEMPORARY TABLE IF NOT EXISTS fighter_ids AS
SELECT id, first_name, last_name FROM fighters;

-- Add UFC 290 fight: Figueiredo vs Moreno
INSERT INTO fights (event_id, fighter1_id, fighter2_id, winner_id, result_type, round, time)
SELECT
    (SELECT id FROM events WHERE name = 'UFC 290'),
    (SELECT id FROM fighter_ids WHERE first_name = 'Deiveson' AND last_name = 'Figueiredo'),
    (SELECT id FROM fighter_ids WHERE first_name = 'Brandon' AND last_name = 'Moreno'),
    (SELECT id FROM fighter_ids WHERE first_name = 'Brandon' AND last_name = 'Moreno'),
    'Decision', 5, '5:00'
    WHERE
    EXISTS (SELECT 1 FROM events WHERE name = 'UFC 290') AND
    EXISTS (SELECT 1 FROM fighter_ids WHERE first_name = 'Deiveson' AND last_name = 'Figueiredo') AND
    EXISTS (SELECT 1 FROM fighter_ids WHERE first_name = 'Brandon' AND last_name = 'Moreno') AND
    NOT EXISTS (
        SELECT 1 FROM fights f
        JOIN fighter_ids f1 ON f.fighter1_id = f1.id
        JOIN fighter_ids f2 ON f.fighter2_id = f2.id
        WHERE
            f1.first_name = 'Deiveson' AND f1.last_name = 'Figueiredo' AND
            f2.first_name = 'Brandon' AND f2.last_name = 'Moreno'
    );

-- Add UFC 292 fight: Sterling vs O'Malley
INSERT INTO fights (event_id, fighter1_id, fighter2_id, winner_id, result_type, round, time)
SELECT
    (SELECT id FROM events WHERE name = 'UFC 292'),
    (SELECT id FROM fighter_ids WHERE first_name = 'Aljamain' AND last_name = 'Sterling'),
    (SELECT id FROM fighter_ids WHERE first_name = 'Sean' AND last_name = 'O''Malley'),
    (SELECT id FROM fighter_ids WHERE first_name = 'Sean' AND last_name = 'O''Malley'),
    'KO/TKO', 2, '0:51'
    WHERE
    EXISTS (SELECT 1 FROM events WHERE name = 'UFC 292') AND
    EXISTS (SELECT 1 FROM fighter_ids WHERE first_name = 'Aljamain' AND last_name = 'Sterling') AND
    EXISTS (SELECT 1 FROM fighter_ids WHERE first_name = 'Sean' AND last_name = 'O''Malley') AND
    NOT EXISTS (
        SELECT 1 FROM fights f
        JOIN fighter_ids f1 ON f.fighter1_id = f1.id
        JOIN fighter_ids f2 ON f.fighter2_id = f2.id
        WHERE
            f1.first_name = 'Aljamain' AND f1.last_name = 'Sterling' AND
            f2.first_name = 'Sean' AND f2.last_name = 'O''Malley'
    );

-- Add UFC 291 fight: Makhachev vs Oliveira
INSERT INTO fights (event_id, fighter1_id, fighter2_id, winner_id, result_type, round, time)
SELECT
    (SELECT id FROM events WHERE name = 'UFC 291'),
    (SELECT id FROM fighter_ids WHERE first_name = 'Islam' AND last_name = 'Makhachev'),
    (SELECT id FROM fighter_ids WHERE first_name = 'Charles' AND last_name = 'Oliveira'),
    (SELECT id FROM fighter_ids WHERE first_name = 'Islam' AND last_name = 'Makhachev'),
    'Submission', 3, '3:17'
    WHERE
    EXISTS (SELECT 1 FROM events WHERE name = 'UFC 291') AND
    EXISTS (SELECT 1 FROM fighter_ids WHERE first_name = 'Islam' AND last_name = 'Makhachev') AND
    EXISTS (SELECT 1 FROM fighter_ids WHERE first_name = 'Charles' AND last_name = 'Oliveira') AND
    NOT EXISTS (
        SELECT 1 FROM fights f
        JOIN fighter_ids f1 ON f.fighter1_id = f1.id
        JOIN fighter_ids f2 ON f.fighter2_id = f2.id
        WHERE
            f1.first_name = 'Islam' AND f1.last_name = 'Makhachev' AND
            f2.first_name = 'Charles' AND f2.last_name = 'Oliveira'
    );

-- Add simple rankings
INSERT INTO rankings (fighter_id, weight_class_id, rank, updated_at)
SELECT
    (SELECT id FROM fighter_ids WHERE first_name = 'Brandon' AND last_name = 'Moreno'),
    13,
    1,
    '2024-05-01 00:00:00'
    WHERE
    EXISTS (SELECT 1 FROM fighter_ids WHERE first_name = 'Brandon' AND last_name = 'Moreno') AND
    NOT EXISTS (
        SELECT 1 FROM rankings r
        JOIN fighter_ids f ON r.fighter_id = f.id
        WHERE f.first_name = 'Brandon' AND f.last_name = 'Moreno'
    );

INSERT INTO rankings (fighter_id, weight_class_id, rank, updated_at)
SELECT
    (SELECT id FROM fighter_ids WHERE first_name = 'Sean' AND last_name = 'O''Malley'),
    14,
    1,
    '2024-05-01 00:00:00'
    WHERE
    EXISTS (SELECT 1 FROM fighter_ids WHERE first_name = 'Sean' AND last_name = 'O''Malley') AND
    NOT EXISTS (
        SELECT 1 FROM rankings r
        JOIN fighter_ids f ON r.fighter_id = f.id
        WHERE f.first_name = 'Sean' AND f.last_name = 'O''Malley'
    );

INSERT INTO rankings (fighter_id, weight_class_id, rank, updated_at)
SELECT
    (SELECT id FROM fighter_ids WHERE first_name = 'Islam' AND last_name = 'Makhachev'),
    16,
    1,
    '2024-05-01 00:00:00'
    WHERE
    EXISTS (SELECT 1 FROM fighter_ids WHERE first_name = 'Islam' AND last_name = 'Makhachev') AND
    NOT EXISTS (
        SELECT 1 FROM rankings r
        JOIN fighter_ids f ON r.fighter_id = f.id
        WHERE f.first_name = 'Islam' AND f.last_name = 'Makhachev'
    );

-- Clean up temporary tables
DROP TABLE IF EXISTS fighter_ids;