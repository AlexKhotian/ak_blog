const BlendItPodcast = () =>  (
      <div dangerouslySetInnerHTML={{ __html: renderBuzzsproutPlayerHTML() }} />
);

function renderBuzzsproutPlayerHTML() {
  return unescape(decodeURI("%3Cdiv%20class=%22episode%22%3E%0A%3Ciframe%20id=%22player_iframe%22%20src=%22https://www.buzzsprout.com/903283?client_source=large_player&amp;iframe=true&amp;limit=5&amp;referrer=https%253A%252F%252Fwww.buzzsprout.com%252F903283.js%253Fplayer%253Dlarge%2526limit%253D5%2526container_id%253Dblendit%22%20width=%22100%25%22%20height=%22375%22%20frameborder=%220%22%20scrolling=%22no%22%20title=%22BlendIT%22%3E%3C/iframe%3E%0A%3C/div%3E%0A"));
}



export default BlendItPodcast;