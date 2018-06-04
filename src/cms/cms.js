import CMS from "netlify-cms";

import WhoWeArePagePreview from "./preview-templates/WhoWeArePagePreview";
import BlogPostPreview from "./preview-templates/BlogPostPreview";

CMS.registerPreviewStyle("/styles.css");
CMS.registerPreviewTemplate("about", WhoWeArePagePreview);
CMS.registerPreviewTemplate("blog", BlogPostPreview);
