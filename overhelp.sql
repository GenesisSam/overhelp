create database overhelp;

use overhelp;

create table support_language(
  idx int auto_increment,
  type varchar(30),
  primary key (idx, type),
  index (type)
);

create table overhelp(
  idx int primary key auto_increment,
  full_error_message text,
  parsed_error_message varchar(300),
  target_platform varchar(30),
  solution text,
  created_datetime datetime,
  stackoverflow_question_link text,
  stackoverflow_answer_link text,
  qna_link text,
  user_feedback_score double,
  visibled_count int,
  is_good int,
  is_bad int,

  foreign key (target_platform) references support_language(type)
);
