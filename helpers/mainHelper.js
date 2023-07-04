import axios from 'axios';
import {load} from 'cheerio';
export const getWebLinks = async (domain) => {
    try {
      const response = await axios.get(`https://${domain}`);
      const html = response.data;
      const $ = load(html);
      const links = [];
      $('a').each((index, element) => {
        const href = $(element).attr('href');
        if (href && !href.startsWith('#')) {
          const absoluteUrl = new URL(href, `https://www.${domain}`).href;
          links.push(absoluteUrl);
        }
      });
      return links;
    } catch (error) {
      throw error;
    }
  };


  export const getMediaLinks = async (domain) => {
    try {
      const response = await axios.get(`https://${domain}`);
      const html = response.data;
      const $ = load(html);
      const mediaLinks = [];
      $('img, video, audio').each((index, element) => {
        const src = $(element).attr('src');
        if (src) {
          const absoluteUrl = new URL(src, `https://${domain}`).href;
          mediaLinks.push(absoluteUrl);
        }
      });
      return mediaLinks;
    } catch (error) {
      throw error;
    }
  };


  export const countWords = async (url) => {
    try {
      const response = await axios.get(`https://${url}`);
      const html = response.data;
      const $ = load(html);
      const text = $('body').text(); // Extract text from the website's <body> tag
      const words = text.split(/\s+/); // Split the text into an array of words
      const wordCount = words.length;
      return wordCount;
    } catch (error) {
        console.log(error)
      throw error;
    }
  };