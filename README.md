# Table of contents

1. [How to test this project](#how-to-test-this-project)
2. [Task explanation](#task-explanation)
3. [Tasks](#tasks)
   - [Task 1](#task-1)
   - [Task 2](#task-2)
   - [Task 3](#task-3)
   - [Task 4](#task-4)
   - [Task 5](#task-5)
4. [Tech stack](#tech-stack)

---

# How to test this project

1. Create `.env` file and copy `.env.example` file content to it.

2. npm run docker:up.

3. Run `http://localhost:3000/resident?city={city}&skip={skip}&take={take}` in postman

- city\* = your city
- skip? =`number of cities to skip`
- take? =`number of cities to take`

---

# Task explanation

An index on `city_id` in the residents table is to facilitate JOIN operations and improve city-based filtering.

The cities table inherently has an index on id due to the primary key.

If we are searching cities by name, there is a need of adding an index on the `name` column.

But for now, I would rather create only one index:
`city_id` index for residents table

# Tasks

## Task 1

Count of each city members sorted by count DESC

## Task 2

Count of members with same first_name by every city

## Task 3

Filter by “city” field partial coincidence

## Task 4

After each client request send request to logging service (do not need to implement receiver - just send request)

(http://localhost:8765/logging)

with request data in body:

- request duration
- request data
- response data
- http status

## Task 5

Add indexes to DB and explain each.

---

# Tech stack

In this repo:

- dockerized application with PostgreSQL as DB;
- TypeORM as ORM;
- backend on Nest.js

---
////