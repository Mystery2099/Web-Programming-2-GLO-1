import { styles } from './styles.js';
import { head } from './head.js';
import { header } from './header.js';
import { footer } from './footer.js';

export const layout = (content: string, title = 'March Celebration Hub', currentPage = 'home') => `
<!DOCTYPE html>
<html lang="en">
${head(title)}
<body>
  <div class="app-container">
    ${header(currentPage)}
    <div class="page">
      ${content}
    </div>
  </div>
  ${footer}
  <link rel="stylesheet" href="/static/glightbox.css">
  <script src="/static/glightbox.min.js"></script>
  <script src="/static/client.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
          selector: '.clickable-image',
          touchNavigation: true,
          zoomable: true,
          draggable: true,
          loop: true,
          autoplayVideos: false,
          moreLength: 0
        });
      }
    });
  </script>
</body>
</html>
`;
