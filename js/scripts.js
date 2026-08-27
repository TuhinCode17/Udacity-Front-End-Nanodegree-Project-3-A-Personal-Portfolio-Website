// --------------------------------
// ABOUT ME
// Get About Me data and add it to the page.
// --------------------------------
// Build the About Me section using the data we fetched.
const renderAboutMe = (userData) => {

  const newElement = document.createElement('p');
  newElement.textContent =
    userData.aboutMe || "Bio coming soon.";

  const myImage = document.createElement('img');
  myImage.src =
    userData.headshot || "./images/headshot_placeholder.webp";

  // Create the image container
  const headshotContainer = document.createElement('div');
  headshotContainer.classList.add('headshotContainer');

  // Put the image inside the image container
  headshotContainer.append(myImage);

  // Grab the existing #aboutMe container
  const aboutMe = document.getElementById('aboutMe');

  // Add the new content to the existing #aboutMe container
  aboutMe.append(newElement);
  aboutMe.append(headshotContainer);
};


const fetchUserData = async () => {
  try {
    //First get the About Me data from the JSON file.
    const responseData = await fetch('./data/aboutMeData.json');

    if (!responseData.ok) {
      throw new Error('Unable to load About Me data.');
    }

    const userData = await responseData.json();
    renderAboutMe(userData);
    

  } catch (error) {
    // If the fetch fails, show the error in the console.
    console.error('Unable to load About Me data:', error);
  }
};

fetchUserData();
// --------------------------------
// PROJECTS
// Get project data, build the cards,
// set the default spotlight, and handle card clicks.
// --------------------------------

// Build the project cards using the data we fetched.
const renderProjects = (projectsData) => {

  // Grab the existing project list because this is where the cards go.
  const projectList = document.getElementById('projectList');

  //Build all the cards here first and add them to the page together.
  const fragment = document.createDocumentFragment();

  projectsData.forEach((project) => {

    //Make one new card for the current project.
    const projectCard = document.createElement('div');
    projectCard.classList.add('projectCard');

    // Keep the project_id as the card id so I can indentify the card later.
    projectCard.id = project.project_id;

    const projectName = document.createElement('h4');
    projectName.textContent =
      project.project_name || "Untitled Project";
    projectCard.append(projectName);

    const projectDescription = document.createElement('p');
    projectDescription.textContent =
      project.short_description || "Description coming soon.";
    projectCard.append(projectDescription);

    // card_image is used as a CSS background, not an <img>.
    // If it is missing, use the provided placeholder.
    if (project.card_image) {
      projectCard.style.backgroundImage =
        `url(${project.card_image})`;
    } else {
      projectCard.style.backgroundImage =
        `url(./images/card_placeholder_bg.webp)`;
    }

    fragment.append(projectCard);
  });

  projectList.append(fragment);

  return projectList;
};

// Update the spotlight using the selected project.
const updateSpotlight = (project) => {

  const spotlightTitles =
    document.getElementById('spotlightTitles');

  const projectSpotlight =
    document.getElementById('projectSpotlight');

  const spotlightTitle =
    document.createElement('h3');

  spotlightTitle.textContent =
    project.project_name || "Untitled Project";

  const spotlightDescription =
    document.createElement('p');

  spotlightDescription.textContent =
    project.long_description || "More details coming soon.";

  const projectLink =
    document.createElement('a');

  projectLink.textContent =
    "Click here to see more...";

  if (project.url) {
    projectLink.href = project.url;
    projectLink.style.display = '';
  } else {
    projectLink.href = "#";
    projectLink.style.display = 'none';
  }

  // Replace the old spotlight content with the selected project.
  spotlightTitles.replaceChildren(
    spotlightTitle,
    spotlightDescription,
    projectLink
  );

  // Use the project image or the placeholder if it is missing.
  if (project.spotlight_image) {
    projectSpotlight.style.backgroundImage =
      `url(${project.spotlight_image})`;
  } else {
    projectSpotlight.style.backgroundImage =
      `url(./images/spotlight_placeholder_bg.webp)`;
  }
};

// Set up the arrows so the project list keeps scrolling while held.
const setupProjectScrolling = (projectList) => {

  // Grab the two arrows that are already in the HTML.
  const leftArrow = document.querySelector('.arrow-left');
  const rightArrow = document.querySelector('.arrow-right');

  // Use one card to work out how far one scroll step should be.
  const card = document.querySelector('.projectCard');
  const gap = parseFloat(getComputedStyle(projectList).gap);

  const stepX = card.offsetWidth + gap;
  const stepY = card.offsetHeight + gap;

  // Keep scrolling while the arrow is being held down.
  let scrollInterval = null;

  const startScrolling = (direction) => {

    if (scrollInterval) return;

    // Keep moving the project list while the arrow is held down.
    scrollInterval = setInterval(() => {

      const desktopView =
        window.matchMedia("(min-width: 1024px)");

      // Check the screen size because the same arrows
      // move horizontally on mobile and vertically on desktop.
      if (desktopView.matches) {

        // Use smaller steps so the list moves continuously instead of jumping.
        projectList.scrollBy({
          top: direction * stepY / 10,
          behavior: 'auto'
        });

      } else {

        // Use smaller steps so the list moves continuously instead of jumping.
        projectList.scrollBy({
          left: direction * stepX / 10,
          behavior: 'auto'
        });

      }

    }, 16);
  };

  const stopScrolling = () => {

    clearInterval(scrollInterval);
    scrollInterval = null;

  };


  // Left arrow
  leftArrow.addEventListener('pointerdown', () => {
    startScrolling(-1);
  });

  leftArrow.addEventListener('pointerup', stopScrolling);
  leftArrow.addEventListener('pointerleave', stopScrolling);
  leftArrow.addEventListener('pointercancel', stopScrolling);


  // Right arrow
  rightArrow.addEventListener('pointerdown', () => {
    startScrolling(1);
  });

  rightArrow.addEventListener('pointerup', stopScrolling);
  rightArrow.addEventListener('pointerleave', stopScrolling);
  rightArrow.addEventListener('pointercancel', stopScrolling);
};

// Set up the project card click behavior.
const setupProjectEvents = (projectList, projectsData) => {

  projectList.addEventListener('click', (event) => {

    const clickedCard = event.target.closest('.projectCard');

    // If the click was not on a project card, do nothing.
    if (!clickedCard) return;

    projectsData.forEach((project) => {

      if (String(project.project_id) === clickedCard.id) {

        const selectedProject = project;

        updateSpotlight(selectedProject);
      }
    });
  });
};

const fetchProjectData = async () => {
  try {
    // Get the whole project list first.
    const responseData = await fetch('./data/projectsData.json');

    if (!responseData.ok) {
      throw new Error('Unable to load project data.');
    }

  const projectsData = await responseData.json();

  const projectList = renderProjects(projectsData);

   

    // --------------------------------
    // DEFAULT PROJECT SPOTLIGHT
    // --------------------------------

   // Show the first project when the page loads.
    const defaultProject = projectsData[0];
    updateSpotlight(defaultProject);


    // --------------------------------
    // CARD CLICK → UPDATE SPOTLIGHT
    // --------------------------------
     
    // Set up the project card click behavior.
     
      setupProjectEvents(projectList, projectsData);

// --------------------------------
// PROJECT ARROWS
// Hold an arrow to keep scrolling.
// Mobile = horizontal, desktop = vertical.
// --------------------------------
    
// Set up the project arrows.
setupProjectScrolling(projectList);
   
  } catch (error) {
    // If the fetch fails, show the error in the console.
    console.error('Unable to load project data:', error);
  }
};

fetchProjectData();

// --------------------------------
// CONTACT FORM
// Validate the email and message,
// and update the character counter.
// --------------------------------

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const hasIllegalCharacters = (value) => {
  const invalidCharacterPattern = /[^a-zA-Z0-9@._-]/;
  return invalidCharacterPattern.test(value);
};

// Set up the contact form validation and character counter.
const setupFormValidation = () => {

const emailInput = document.getElementById('contactEmail');
const emailError = document.getElementById('emailError');

const messageInput = document.getElementById('contactMessage');
const messageError = document.getElementById('messageError');
const charactersLeft = document.getElementById('charactersLeft');

const form = document.getElementById('formSection');


messageInput.addEventListener('input', () => {

  const remaining = 300 - messageInput.value.length;

  charactersLeft.textContent = remaining;

  if (remaining < 0) {
    charactersLeft.classList.add('error');
  } else {
    charactersLeft.classList.remove('error');
  }

});



// --------------------------------
// FORM SUBMISSION
// --------------------------------

form.addEventListener('submit', (event) => {

  // Stop the normal form submission because this project 
  // wants JavaScript to handle the validation.
  event.preventDefault();

const emailValue = emailInput.value.trim();
const messageValue = messageInput.value.trim();

// Run the email and message checks first so I can use their 
// true / false results later when deciding where to show success.  

const emailValid = isValidEmail(emailValue);
const emailHasIllegalCharacters =
  hasIllegalCharacters(emailValue);

const messageHasIllegalCharacters =
  hasIllegalCharacters(messageValue);

const messageValid =
  messageValue.length > 0 &&
  !messageHasIllegalCharacters &&
  messageValue.length <= 300;


  // --------------------------------
  // EMAIL VALIDATION
  // --------------------------------

  if (!emailValue) {
    emailError.textContent =
      'Please enter your email address.';
    emailError.classList.add('error');
  
  } else if (emailHasIllegalCharacters) {
    emailError.textContent =
      'Email contains invalid characters.';
    emailError.classList.add('error');
  
  } else if (!emailValid) {
    emailError.textContent =
      'Please enter a valid email address.';
    emailError.classList.add('error');
  
  } else {
    emailError.textContent = '';
    emailError.classList.remove('error');
  }


  // --------------------------------
  // MESSAGE VALIDATION
  // --------------------------------

  if (!messageValue) {
    messageError.textContent =
      'Please enter a message.';
    messageError.classList.add('error');
  
  } else if (messageHasIllegalCharacters) {
    messageError.textContent =
      'Message contains invalid characters.';
    messageError.classList.add('error');
  
  } else if (messageValue.length > 300) {
    messageError.textContent =
      'Message must be 300 characters or less.';
    messageError.classList.add('error');
  
  } else {
    messageError.textContent = '';
    messageError.classList.remove('error');
  }
  // --------------------------------
  // SUCCESS
  // --------------------------------

  if (
    emailValid &&
    !emailHasIllegalCharacters &&
    messageValid
  ) {
    alert('Form submitted successfully!');
  }
});

};

setupFormValidation();




