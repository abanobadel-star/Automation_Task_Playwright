## Setup : 
1. install node.js if not install on machine
2. clone repo 
3. run command npm install
4. run command npm install cross-env --save-dev to install env if you are use window machine 
5. run command npx playwright install to Install the browsers Playwright needs

---------------------------------------------------------------------------------------------

# Runs Tests :

## default env staging : 
1. run all test on env= staging this default env
run command npx playwright test 

## run tests on preprod
2. run all test on env = preprod 
run command npx cross-env ENV=preprod npx playwright test

## run tests on prod
3. run all test on env = prod 
run command npx cross-env ENV=prod npx playwright test

## run tests using tag regression
4. run tests with specific tag 
run command : npx playwright test --grep "@regression" 

## run test in speific file
5. run tests for specific file 
run command npx playwright test tests/homePage.spec.ts

## open report 
6. open HTML report 
run command npx playwright show-report

## to build docker file 
7. open terminal 
run command : docker build -t automation-task . 

## to run test using docker 
8. run command : docker run --rm automation-task

## run test using docker on specific env 
9. $env:ENV = 'prod' ; docker-compose up  

## run test using docker on specific env and tag 
10. docker-compose run --rm -e ENV=prod -e TAG=@smoke playwright
    