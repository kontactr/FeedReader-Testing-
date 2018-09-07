/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });



        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('url is defined and it is not empty', function () {

            allFeeds.forEach(function (allFeed) {
                expect(allFeed.url).toBeDefined();
                expect(allFeed.url).not.toEqual("");

            });

        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name is defined and it is not empty', function () {

            allFeeds.forEach(function (allFeed) {
                expect(allFeed.name).toBeDefined();
                expect(allFeed.name).not.toEqual("");

            });


        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("Menu is hidden", function () {

            let bodyElement = document.getElementsByTagName("body");

            expect(bodyElement[0].classList.contains("menu-hidden")).toEqual(true);

        });



        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it("Menu click event trigger", function () {

            let bodyElement = document.getElementsByTagName("body");

            let menuIcon = $('.menu-icon-link');


            menuIcon.click();
            expect(bodyElement[0].classList.contains("menu-hidden")).toEqual(false);

            menuIcon.click();
            expect(bodyElement[0].classList.contains("menu-hidden")).toEqual(true);


        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function () {


        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */


         /**
          *  We always have to call done function in both the Async call function and tests
          *  Why? :
          *     1) Async function will put in event queue and starts other execution or waits for it
          *     2) when the current stack completes its execution
          *     3) it starts execution in the event queue function
          *     4) imagine now our function is in the stack
          *     5) after the completion of the our async function a signal code is passed
          *     6) which triggers our code where we stopped and starts exec or it will call 
          *        success or fail method as per defined if our code is not in block mode
          *     7) after the done signal recived the code starts execute tests 
          *     8) in tests as per framework doc also require done function to call because
          *        it waits for some time or we can say that it also put that code in event queue
          *        so that when we call done from that our code will execute as normal
          *
          *
          *    What i think it is (framework stops regular code put async and test code which has 
          *    done function in the event queue after completion it starts execution normally) :(
          */


        beforeEach(function (done) {


            loadFeed(0, done);


        });

        it("Feed contain at least one entry after complete loadFeed", function (done) {

            let container = $(".feed .entry");

            expect(container.length).toBeGreaterThan(0);
            done();

        });

    });




    /* TODO: Write a new test suite named "New Feed Selection" */


    describe("New Feed Selection", function () {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        let oldFeed;
        let newFeed;


        /**
         *1)  We have to use beforeEach function unless the test will be executed without
         *    async task completed
         * 
         *2)  for the second async task we have to put it in first async task success function
         *    if we try something like this     
         *    
         *    loadFeed(index , done);
         *    oldData = $(".feed").text();
         *    loadFeed(index , done);
         *    newData = $(".feed").text();
         * 
         *    then both oldaData and newData contain same data because whenever first loadfunctions'
         *    done function completes its execution the framework starts the execution of the test cases
         *    second loadfunction is also called but before its completion of the done function 
         *    tests will be executed. so we will follow the following approach.   
         * 
        */



        beforeEach(function (done) {

            loadFeed(0,
                function () {
                    oldFeed = $(".feed").text();


                    loadFeed(2, function () {
                        newFeed = $(".feed").text();

                        done();
                    });
                }


            );
        });

        it("Feed Changes", function (done) {

            console.log(oldFeed);
            expect(oldFeed).not.toEqual(undefined);
            console.log("NEW");
            console.log(newFeed);
            expect(newFeed).not.toEqual(undefined);
            expect(oldFeed).not.toBe(newFeed);

            done();
        });






    });




}());