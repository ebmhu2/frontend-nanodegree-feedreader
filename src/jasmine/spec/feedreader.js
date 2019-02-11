/**
 *  feedreader.js
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/**
 * We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
/**
 * This is our first test suite - a test suite just contains
 * a related set of tests. This suite is all about the RSS
 * feeds definitions, the allFeeds variable in our application.
 */
  let bodyElement;
  let menuIcon;

  describe('RSS Feeds', function() {
	  /**
		 * This is first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty.
		 */
    it('are defined', function() {
		  expect(allFeeds).toBeDefined();
		  expect(allFeeds.length).not.toBe(0);
	  });

	  /**
		 * This is test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
	  it('URL is defined', function() {
		  allFeeds.forEach(function(feed) {
			  expect(feed.url).toBeDefined();
			  expect(feed.url.length).not.toBe(0);
		  });
	  });

	  /**
		 * This is a test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
	  it('name is defined', function() {
		  allFeeds.forEach(function(feed) {
			  expect(feed.name).toBeDefined();
			  expect(feed.name.length).not.toBe(0);
		  });
	  });
  });


  /**
	 * This is test suite named "The menu" contains a related set of tests
	 */
  describe('The menu', function() {
	  beforeEach(function() {
		  bodyElement = document.querySelector('body');
		  menuIcon = $('.menu-icon-link');
	  });

	  /**
		 *  This test that ensures the Menu element is hidden by default.
		 */
	  it('is hidden by default', function() {
		  expect(bodyElement).toHaveClass('menu-hidden');
	  });

	  /**
		 * This test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
	  it('Menu is visible and hidden when menu icon is clicked', function() {
		  menuIcon.trigger('click');
		  expect(bodyElement).not.toHaveClass('menu-hidden');
		  menuIcon.trigger('click');
		  expect(bodyElement).toHaveClass('menu-hidden');
	  });
  });


  /**
	 * This is test suite named "Initial Entries" contains one test
	 */
  describe('Initial Entries', function() {
	  /**
		 * took an argument (done),
		 * Jasmine will pass a function done to be invoked when,
		 * asynchronous work (loadFeed) has been completed.
		 */
	  beforeEach(function(done) {
		  loadFeed(0, done);
	  },10000);

	  /**
		 * This is test that ensures when the loadFeed function
		 * is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 */
	  it('feed container has at least one entry', function() {
		  expect($('.feed .entry').length > 0).toBe(true);
	  });
  });


  /**
	 * This is test suite named "New Feed Selection"
	 * contains a related set of tests
	 */
  describe('New Feed Selection', function() {
	  let firstFeedContent = [];
	  let secondFeedContent = [];
	  let firstTitle, secondTitle;
	  let randomIndex1, randomIndex2;

	  /**
		 * @description used to get feed content within the .feed container
		 * @return [object] feedArray - array that contains all feed content
		 */
	  let getFeedContent = function() {
		  let feedArray = [];
		  $('.feed h2').each(function() {
		  	feedArray.push($(this).text());
		  });
	  	return feedArray;
	  };

	  /**
		 * @description used to get feed title within the .header-title
		 * @return [string] - feed title
		 */
	  let getFeedTitle = function() {
	  	return $('.header-title').text();
	  };

  	/**
		 * Run some shared setup before each of the specs,
		 * in the describe in which it is called.
		 * took an argument (done),
		 * Jasmine will pass a function done to be invoked when,
		 * asynchronous work (loadFeed) has been completed.
		 * use randomIndex1 and randomIndex2 to get,
		 * two different index number between 0 and allfeed array length.
		 * fill arrays named first firstFeedContent and secondFeedContent
		 * using loadfeed with randomIndex1 and randomIndex2.
		 */
	  beforeEach(function(done) {
	  	randomIndex1 = Math.floor(Math.random() * (allFeeds.length));
		  randomIndex2 = Math.floor(Math.random() * (allFeeds.length));
		  while (randomIndex2 === randomIndex1) {
		  	randomIndex2 = Math.floor(Math.random() * (allFeeds.length));
		  }
	  	loadFeed(randomIndex1, function() {
		    firstTitle = getFeedTitle();
		    firstFeedContent = getFeedContent();
		    loadFeed(randomIndex2, function() {
			    secondTitle = getFeedTitle();
		      secondFeedContent = getFeedContent();
			    done();
			  });
		  });
	  },30000);

	  /**
		 * This is a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */
	  it('content changes', function() {
		  firstFeedContent.forEach(function(feed) {
			  expect(feed).toBeDefined();
		  });
		  secondFeedContent.forEach(function(feed) {
			  expect(feed).toBeDefined();
		  });
		  secondFeedContent.forEach(function(element, index) {
			  expect(element === firstFeedContent[index]).toBeFalsy();
		  });
	  });

	  /**
		 * This is a test that ensures when a new feed is loaded
		 * by the loadFeed function that the Title actually changes.
		 */
	  it('Title changes', function() {
		  expect(firstTitle === secondTitle).toBeFalsy();
	  });
  });


  /**
	 * This is test suite named "The Slide Feed List"
	 * contains a related set of tests
	 */
  describe('The Slide Feed List', function() {
	  let feedNameArray = getAllFeedName();
	  let slideListArray = [];
	  let randomIndex = Math.floor(Math.random() * (allFeeds.length));

    /**
		 * fill array slideListArray with all feed name items
		 * within the .feed-list element .
		 * random selection for item from slide feed list,
		 * will trigger click event for ".feed-list a",
		 * click event handler in "app.js" will be run  and
		 * selected title in "app.js" updated
		 */
	  beforeEach(function() {
		  slideListArray = [];
		  $('.feed-list a').each(function() {
			  slideListArray.push($(this).text());
			  if ($(this).data('id') === randomIndex) {
				  $(this).trigger('click');
			  }
		  });
	  });

	  /**
		 * This is a test that ensures that slide feed list
		 * has all name property from allFeeds array.
		 */
	  it('slide Feed list has data from allfeeds',function() {
		  slideListArray.forEach(function(feedTitle, index) {
			  expect(feedTitle === feedNameArray[index]).toBeTruthy();
		  });
	  });

	  /** This is a test that ensures that when slide list selection,
		 * change , index will be change .
		 * selectedTitle variable in "app.js" that is updated
		 * with click event on ".feed-list a"
		 * click event done by randomIndex
		 * this randomIndex will be used to get expected Title
		 * from feedNameArray to be compared to updated selectedTitle.
		 */
	  it('Feed list selection change correct',function() {
	    expect(selectedTitle === feedNameArray[randomIndex]).toBeTruthy();
	  });
  });
}());
