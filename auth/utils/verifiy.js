const axios = require('axios');
const cheerio = require('cheerio');
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError = require('salahorg/errors/not-found-error');

async function scraping(URL) {
 // console.log("SACRAPING");
  if (
    URL.indexOf('https://bu.edu.eg/staff/') !== 0 &&
    URL.indexOf('http://bu.edu.eg/staff/') !== 0 &&
    URL.indexOf('bu.edu.eg/staff/') !== 0
  ) {

    throw new BadRequestError('URL is not valid');
  }

  const data = await axios
    .get(URL)
    .then((resp) => {

      const $ = cheerio.load(resp.data);
      const academicPos = $('h4:contains("Academic Position:")')
        .children('span')
        .text();
      const eduMail = $('h4:contains("Edu-Mail:")').children('span').text();
      const Faculty = $('h4:contains("Faculty:")').children('span').text();
      const Department = $('h4:contains("Department:")')
        .children('span')
        .text();
      const Mobile = $('h4:contains("Mobile:")').children('span').text();
      const ScientificName = $('h4:contains("Scientific Name:")')
        .children('span')
        .text();
      const title = $('#MainTitle').text();

      console.log('xcascascascs');
      
      const Name = title.substring(0, title.indexOf('NewsResearch Interests'));
      const data = {
        Name,
        ScientificName,
        academicPos,
        eduMail,
        Mobile,
        Faculty,
        Department,
      };
      console.log(data);

      return data;
    })
    .catch((err) => {
      throw new Error(err.message);
      console.log("ERROR HERE");

    });
    console.log(data);

  return data;
}

module.exports = { scraping };
