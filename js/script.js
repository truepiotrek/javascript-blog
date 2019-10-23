'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;  
  
  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */


  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');


  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  

  /* [DONE] add class 'active' to the correct article */
  clickedElement.classList.add('active');
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagSelector = '.post-tags .list',
  optTagsListSelector = '.tags .list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';



function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  
  let html='';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){
    
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */
    

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */
    html = html + linkHTML;
  
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(tags){
  const params = {
    min: 99999,
    max: 0
  };
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    } if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  // [NEW] create a new variable allTags with an empty object
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
  
    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagSelector);
    

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray) {
      
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      
      /* add generated code to html variable */
      html = html + linkHTML;

      // [NEW] check if this link is NOT already in allTags
      if(!allTags.hasOwnProperty(tag)){

        // [NEW] add tag to allTags object
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
  /* END LOOP: for every article: */ 
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:',tagsParams);
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';
  

  // [NEW] START LOOP: for each tag in allTags
  for(let tag in allTags){

    //[NEW] Generate code of a link and add it to allTagsHTML
    const tagLinkHTML = '<li><a href="#' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"><span>' + tag + '</span></a></li>';
    console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
  }
  // [NEW] add html from allTagsHTML to tagList
  tagList.innerHTML = allTagsHTML;
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;  
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){

    /* remove class active */
    activeTagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const activeLinks = document.querySelectorAll('a[href="' + href + '"]');

  console.log(activeLinks);

  /* START LOOP: for each found tag link */
  for(let activeLink of activeLinks){
    
    /* add class active */
    activeLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const articleLinks = document.querySelectorAll('.post-tags a');

  /* START LOOP: for each link */
  for(let articleLink of articleLinks){

    /* add tagClickHandler as event listener for that link */
    articleLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToTags();


function generateAuthors(){
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    const authorWrapper = article.querySelector('.post-author');
    const articleAuthor = article.getAttribute('data-author');
    let anchor = document.createElement('a');
    anchor.setAttribute('href', '#author-' +  articleAuthor);
    anchor.innerHTML = 'by ' + articleAuthor;
    anchor.addEventListener('click', authorClickHandler);
    authorWrapper.appendChild(anchor);
  }
}
generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const href = event.target.getAttribute('href');
  const author = href.replace('#author-','');
  console.log(author);
  
  // const sidebarLinks = document.querySelectorAll('.sidebar a[href^="#article-"]');
  // console.log(sidebarLinks);
  // for(let sidebarLink of sidebarLinks){
  //   sidebarLink.classList.remove('active');
  // }
  // const activeLinks = document.querySelectorAll('.sidebar a[href="' + author + '"]');
  // for(let activeLink of activeLinks){
  //   activeLink.classList.add('active');
  // }
  generateTitleLinks('[data-author="' + author + '"]');

}