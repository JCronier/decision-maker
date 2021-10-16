INSERT INTO polls (title, description, email, require_name)
VALUES ('What is your favourite colour?', 'I really wanna know', 'tommy.m.son@gmail.com', true),
('What should we have for dinner?', 'I am hungry', 'acristoffanini@gmail.com', true);

INSERT INTO links (poll_id, admin_url, submit_url, results_url)
VALUES (1, 'color_admin', 'color_submit', 'color_results'),
(2, 'dinner_admin', 'dinner_submit', 'dinner_results');

INSERT INTO choices (poll_id, name)
VALUES (1, 'red'),
(1, 'blue'),
(1, 'green'),
(2, 'sushi'),
(2, 'pizza'),
(2, 'mexican'),
(2, 'chinese');

INSERT INTO results (poll_id, choice_id, points, name)
VALUES (1, 1, 3, 'Jordan'),
(1, 2, 2, 'Jordan'),
(1, 3, 1, 'Jordan'),
(1, 1, 1, 'Tommy'),
(1, 2, 2, 'Tommy'),
(1, 3, 3, 'Tommy'),
(1, 1, 2, 'Alex'),
(1, 2, 3, 'Alex'),
(1, 3, 1, 'Alex'),

(1, 4, 3, 'Jordan'),
(1, 5, 2, 'Jordan'),
(1, 6, 1, 'Jordan'),
(1, 7, 4, 'Jordan'),

(1, 4, 4, 'Tommy'),
(1, 5, 2, 'Tommy'),
(1, 6, 3, 'Tommy'),
(1, 7, 1, 'Tommy'),

(1, 4, 2, 'Alex'),
(1, 5, 3, 'Alex'),
(1, 6, 4, 'Alex'),
(1, 7, 1, 'Alex');
