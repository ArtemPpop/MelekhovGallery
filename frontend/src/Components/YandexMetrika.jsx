import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const YANDEX_ID = 109570314;

const YandexMetrika = () => {
  const location = useLocation();

  useEffect(() => {
    if (!window.ym) {
      (function(m, e, t, r, i, k, a) {
        m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments); };
        m[i].l = 1 * new Date();
        k = e.createElement(t);
        a = e.getElementsByTagName(t)[0];
        k.async = 1;
        k.src = r;
        a.parentNode.insertBefore(k, a);
      })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

      window.ym(YANDEX_ID, 'init', {
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      });
    }
  }, []);

  useEffect(() => {
    if (window.ym) {
      window.ym(YANDEX_ID, 'hit', location.pathname + location.search);
    }
  }, [location]);

  return null;
};

export default YandexMetrika;