const URL = "http://localhost:3000/tweets";
// http://localhost:3000/tweets?q=coding&count=10
/**
 * Retrive Twitter Data from API
 */

const onEnter = (e) => {
    if(e.key == "Enter"){
        getTwitterData();
    }
}

const getTwitterData = () => {
    const query = document.getElementById("user-search-input").value;
    if(!query) return;
    const encodedQuery = encodeURIComponent(query);
    const params = `q=${encodedQuery}&result_type=mixed`;
    let fullUrl = `${URL}?${params}`;
    fetch(fullUrl)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        buildTweets(data.statuses);
    })
}

/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {
}

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {
}

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {
}

/**
 * Build Tweets HTML based on Data from API
 */
const buildTweets = (tweets, nextPage) => {
    let twitterContent = "";
    tweets.map((tweet) => {
        twitterContent += `
            <div class="tweet-container">
                <div class="tweet-user-info">
                    <div class="tweet-user-profile">
                        
                    </div>
                    <div class="tweet-user-name-container">
                        <div class="tweet-user-fullname">
                            Ibnul Ashir
                        </div>
                        <div class="tweet-user-username">
                            @ibnul42
                        </div>
                    </div>
                </div>
                `
                if(tweet.extended_entities 
                    && tweet.extended_entities.media
                    && tweet.extended_entities.media.length > 0){
                    twitterContent += buildImages(tweet.extended_entities.media);
                    twitterContent += buildVideo(tweet.extended_entities.media);
                }
                twitterContent += `
                <div class="tweet-text-container">
                    <span class="tweet-text">
                    ${tweet.full_text}
                    </span>
                </div>
                <div class="tweet-date-container">
                    10 hours ago
                </div>
            </div>
        `
    })
    document.querySelector('.tweets-list').innerHTML = twitterContent;
}

/**
 * Build HTML for Tweets Images
 */
 const buildImages = (mediaList) => {
    let imagesContent = `<div class="tweet-images-container">`;
    let imagesExist = false;
    mediaList.map((media)=>{
        if(media.type == "photo"){
            imagesExist = true;
            imagesContent += `
                <div class="tweet-image" style="background-image: url(${media.media_url_https})"></div>`
        }
    })
    imagesContent += `</div>`;
    return (imagesExist ? imagesContent : '');
}

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {
    let videoContent = `<div class="tweet-video-container">`;
    let videoExist = false;
    mediaList.map((media)=>{
        if(media.type == "video"){
            videoExist = true;
            videoContent += `
            <video controls>
                <source src="${media.video_info.variants[0].url}" type="video/mp4">
            </video>
            `
        } else if(media.type == "animated_gif"){
            videoExist = true;
            videoContent += `
            <video loop autoplay>
                <source src="${media.video_info.variants[0].url}" type="video/mp4">
            </video>
            `
        }
    })
    videoContent += `</div>`;
    return (videoExist ? videoContent : '');
}
