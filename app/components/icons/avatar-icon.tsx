import { LucideProps } from "lucide-react";
import * as React from "react";

const AvatarIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="42"
    height="43"
    {...props}
    fill="none"
    viewBox="0 0 42 43"
  >
    <circle cx="21" cy="21.5" r="21" fill="#F0F0F0"></circle>
    <circle
      cx="21"
      cy="21.5"
      r="21"
      fill="url(#pattern0_360_11776)"
      style={{ mixBlendMode: "multiply" }}
    ></circle>
    <circle
      cx="21"
      cy="21.5"
      r="20.5"
      stroke="#779CBF"
      strokeOpacity="0.22"
    ></circle>
    <defs>
      <pattern
        id="pattern0_360_11776"
        width="1"
        height="1"
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#image0_360_11776" transform="scale(.01333)"></use>
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAAAXNSR0IArs4c6QAAAcVJREFUeF7t3NFxwjAQhGGps6SWJDVACQk1JLUknZkBP3KC3dHZUpg/zxdsfb5bZDNQy6C/ZVmWzEPXWmvm60WvtfkBWgsAy7i0YIFlCBildFYpJRvB8JdKe94I0gMeLOmarUVggXUVYAyNRujCmn3kVAc19MG6jJd4qwQWWOoArnV0luGVjpUd5sefP2M5j0s/314eFxkVEaCcWWAZ+yywwGoOJmO4RWbNPnLqmtNDPzowWPHlCN8NwQJLnd526DOGuiFjqFvFD//ILDLL6CGwwLonkL4pzc6n6OSzH8eoLQKWKlVKAQssQ8AopbPAMgSMUjoLLEPAKKWzwDIEjNJ/2Vl77OqzYaJzrnvc7oBljANYYHUKGP+e/STiqTPLcJ2mdFjATyNgnAhYYBkCRimd5WBFtaM2qsZ5Dynd5RPpISvb4KBgGahggWUIGKXpnZV9G2OsRSrtuS0CSyJei8ACqy3AGBrdkY4VHfvw/Zv62zHG+oaUfr2/3kSU/EUnsIzv7oAFVnPEGUMj/bqwnjn0I5hovXLAg2VkFlhgXXuAMewM8/TMmn00o9+rPH3c7sxV166AB0tlbtTNtNOns4yLCdZArDNj+Z67C3b/7gAAAABJRU5ErkJggg=="
        id="image0_360_11776"
        width="75"
        height="75"
        preserveAspectRatio="none"
      ></image>
    </defs>
  </svg>
);

export default AvatarIcon;
