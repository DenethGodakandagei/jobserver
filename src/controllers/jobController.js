import axios from "axios";
import * as cheerio from "cheerio";

export const getJobs = async (req, res) => {
  try {
    const url = "https://www.topjobs.lk/index.jsp";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const jobs = [];

    $("#hotjobs .job-link").each((i, el) => {
      const linkTag = $(el).find("a");
      const h5 = $(el).find("h5");

      if (linkTag.length > 0) {
        let title = linkTag.contents().first().text().trim();
        let company = h5.text().trim();
        let href = linkTag.attr("href") || "";

        const match = href.match(/'(.+?)'/);
        if (match) {
          href = "https://www.topjobs.lk/applicant/" + match[1].replace(/&amp;/g, "&");
        }

        jobs.push({ title, company, link: href });
      }
    });

    res.json(jobs.slice(0, 20));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
