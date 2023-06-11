import axios from 'axios';
import Cookies from 'js-cookie';
const buildClient = ({ req },url) => {
  if (typeof window === 'undefined') {
    // We are on the server
     console.log(req.cookies.token,'jjjjjj');
    return axios.create({
      baseURL: 'https://www.etqanassessmenttool.me',
      headers:req.headers
    });
  } else {
    // We must be on the browser
    const value = Cookies.get('token');
    return axios.create({
      baseURL: '/',
   
    });
  }
};

export default buildClient;