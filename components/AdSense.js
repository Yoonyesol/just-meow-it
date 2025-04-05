import { useEffect } from 'react';

const AdSense = ({ adSlot }) => {
  useEffect(() => {
    if (window) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-layout-key={process.env.GOOGLE_ADS_LAYOUT_KEY}
      data-ad-client={process.env.GOOGLE_ADS_KEY}
      data-ad-slot={adSlot}
      data-ad-format="fluid"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSense;
