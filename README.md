


## Resume builder api

Getting Started

- Clone

    `git clone https://github.com/Doaa-Ismael/koa-resume-builder.git`


- Install

    `cd yarn install`


- Create `.env` file same as .env.example with needed values


- Start server

    `yarn start`


- Run tests

    `yarn test`

### Available APIS
don't forget to update values like auth header
1) User registration

    ```
    curl --request POST \
   --url https://koa-resume-builder.onrender.com/api/users/register \
   --header 'Content-Type: application/json' \
   --data '{
   "userName": "user_name_example",
   "password": "1234567pasword"
   }'
   ```


2) User login

    ```
       curl --request POST \
       --url https://koa-resume-builder.onrender.com/api/users/login \
       --header 'Content-Type: application/json' \
       --data '{
       "userName": "user_name_example",
       "password": "1234567pasword"
       }'
    ```


3) Create resume

    ```
       curl --request POST \
       --url https://koa-resume-builder.onrender.com/api/resumes/ \
       --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYzZDk0ZDliZTczYmEyNWQ3NzcwN2E0ZiIsInVzZXJOYW1lIjoiRG9hYSBJc21hZWwiLCJwYXNzd29yZCI6IiQyYiQxMCRLeW9YLzVWUlJwZEdlWDM2amFiZTMuWVlacmJWWll0UmdKQVp4NS40TmNtTWhNZHVHTExpMiIsIl9fdiI6MH0sImlhdCI6MTY3NTE4NjA4NiwiZXhwIjoxNjc3Nzc4MDg2fQ.wu-V_6FhpPLJnEnE1VcvurqeX4iWwit4wvDMj3MB-Bo'
    ```


4) Update resume

    ``` 
        curl --request PATCH \
        --url https://koa-resume-builder.onrender.com/api/resumes/63d94fcde73ba25d77707a55 \
        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYzZDk0ZDliZTczYmEyNWQ3NzcwN2E0ZiIsInVzZXJOYW1lIjoiRG9hYSBJc21hZWwiLCJwYXNzd29yZCI6IiQyYiQxMCRLeW9YLzVWUlJwZEdlWDM2amFiZTMuWVlacmJWWll0UmdKQVp4NS40TmNtTWhNZHVHTExpMiIsIl9fdiI6MH0sImlhdCI6MTY3NTE4NjA4NiwiZXhwIjoxNjc3Nzc4MDg2fQ.wu-V_6FhpPLJnEnE1VcvurqeX4iWwit4wvDMj3MB-Bo' \
        --header 'Content-Type: application/json' \
        --data '{
        "basicInfo": {
        "name": "JOHN",
        "headline": "Engineer",
        "phone": "+20187346864"
        }
        
        } '
    ```

5) Get resume
    ```
    curl --request GET \
      --url https://koa-resume-builder.onrender.com/api/resumes/63d94fcde73ba25d77707a55 \
      --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYzZDk0ZDliZTczYmEyNWQ3NzcwN2E0ZiIsInVzZXJOYW1lIjoiRG9hYSBJc21hZWwiLCJwYXNzd29yZCI6IiQyYiQxMCRLeW9YLzVWUlJwZEdlWDM2amFiZTMuWVlacmJWWll0UmdKQVp4NS40TmNtTWhNZHVHTExpMiIsIl9fdiI6MH0sImlhdCI6MTY3NTE4NjA4NiwiZXhwIjoxNjc3Nzc4MDg2fQ.wu-V_6FhpPLJnEnE1VcvurqeX4iWwit4wvDMj3MB-Bo'
    
    ```
