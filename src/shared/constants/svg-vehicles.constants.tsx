import type { SVGProps } from "react";

// Turismo — coche bajo, perfil clásico
export const IconCar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 300"
    width="24"
    height="24"
    fill="#fff"
    {...props}
  >
    <g>
      <path d="M 110,185 L 125,185 C 125,185 140,145 190,120 L 230,105 C 250,100 320,100 375,102 L 415,128 L 485,145 C 505,150 515,160 515,172 L 515,185 C 515,192 508,198 498,198 L 456,198 A 42,42 0 0,0 372,198 L 228,198 A 42,42 0 0,0 144,198 L 120,198 C 112,198 110,192 110,185 Z" />
      <path
        d="M 370,110 L 408,133 L 330,133 L 330,110 Z"
        className="fill-surface"
      />
      <path
        d="M 322,110 L 322,133 L 235,133 L 252,110 Z"
        className="fill-surface"
      />
      <path
        d="M 245,110 L 230,133 L 196,133 C 210,120 225,112 245,110 Z"
        className="fill-surface"
      />
      <line
        x1="326"
        y1="108"
        x2="326"
        y2="198"
        className="stroke-surface"
        strokeWidth="2"
      />
      <line
        x1="230"
        y1="108"
        x2="230"
        y2="198"
        className="stroke-surface"
        strokeWidth="2"
      />
      <rect
        x="338"
        y="142"
        width="16"
        height="4"
        rx="2"
        className="fill-surface"
      />
      <rect
        x="242"
        y="142"
        width="16"
        height="4"
        rx="2"
        className="fill-surface"
      />
      <path
        d="M 480,152 L 510,158 L 505,172 L 475,168 Z"
        className="fill-surface"
      />
      <path
        d="M 110,155 L 125,156 L 125,172 L 110,172 Z"
        className="fill-surface"
      />
      <circle
        cx="414"
        cy="198"
        r="32"
        className="fill-surface"
        stroke="currentColor"
        strokeWidth="6"
      />
      <circle cx="414" cy="198" r="18" />
      <circle cx="414" cy="198" r="12" className="fill-surface" />
      <circle cx="414" cy="198" r="5" />
      <circle
        cx="186"
        cy="198"
        r="32"
        className="fill-surface"
        stroke="currentColor"
        strokeWidth="6"
      />
      <circle cx="186" cy="198" r="18" />
      <circle cx="186" cy="198" r="12" className="fill-surface" />
      <circle cx="186" cy="198" r="5" />
    </g>
  </svg>
);

// Furgoneta — más alta que turismo, techo recto corto
export const IconVan = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 300"
    width="24"
    height="24"
    fill="#fff"
    {...props}
  >
    <g transform="translate(600, 0) scale(-1, 1)">
      <path d="M 110,185 C 110,172 115,162 130,158 L 175,148 C 195,143 215,130 250,102 C 265,90 285,85 310,85 L 450,85 C 475,85 488,90 493,102 L 498,110 C 502,118 502,128 502,145 L 502,205 C 502,215 495,222 485,222 L 450,222 A 42,42 0 0,0 366,222 L 234,222 A 42,42 0 0,0 150,222 L 125,222 C 115,222 110,215 110,205 Z" />
      <path d="M 300,78 L 475,78 C 480,78 482,81 480,85 L 295,85 C 293,81 295,78 300,78 Z" />
      <rect x="330" y="78" width="6" height="7" />
      <rect x="440" y="78" width="6" height="7" />
      <path
        d="M 242,108 C 218,130 200,142 182,146 L 245,146 L 245,108 Z"
        className="fill-surface"
      />
      <path
        d="M 253,108 L 350,108 L 350,146 L 253,146 Z"
        className="fill-surface"
      />
      <path
        d="M 358,108 L 472,108 C 478,118 478,132 478,146 L 358,146 Z"
        className="fill-surface"
      />
      <path
        d="M 120,163 L 148,158 L 152,168 L 122,172 Z"
        className="fill-surface"
      />
      <circle
        cx="192"
        cy="222"
        r="34"
        className="fill-surface"
        stroke="currentColor"
        strokeWidth="8"
      />
      <circle cx="192" cy="222" r="16" />
      <circle
        cx="408"
        cy="222"
        r="34"
        className="fill-surface"
        stroke="currentColor"
        strokeWidth="8"
      />
      <circle cx="408" cy="222" r="16" />
    </g>
  </svg>
);

// Furgón — cuerpo cerrado largo y alto
export const IconVanLarge = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 300"
    width="24"
    height="24"
    fill="#fff"
    {...props}
  >
    <g>
      <path d="M 110,215 L 110,85 C 110,75 118,68 128,68 L 340,68 C 370,68 400,85 435,120 L 475,150 C 490,162 495,175 495,190 L 495,215 C 495,222 489,228 482,228 L 448,228 A 42,42 0 0,0 364,228 L 236,228 A 42,42 0 0,0 152,228 L 125,228 C 116,228 110,222 110,215 Z" />
      <path
        d="M 345,82 L 425,128 C 432,132 435,140 435,155 L 345,155 Z"
        className="fill-surface"
      />
      <path
        d="M 230,100 L 325,100 L 325,155 L 230,155 Z"
        className="fill-surface"
      />
      <path
        d="M 125,100 L 220,100 L 220,155 L 125,155 Z"
        className="fill-surface"
      />
      <path
        d="M 445,165 L 485,172 L 482,192 L 448,185 Z"
        className="fill-surface"
      />
      <rect x="110" y="160" width="4" height="40" className="fill-surface" />
      <circle
        cx="406"
        cy="228"
        r="34"
        className="fill-surface"
        stroke="currentColor"
        strokeWidth="8"
      />
      <circle cx="406" cy="228" r="20" />
      <circle cx="406" cy="228" r="14" className="fill-surface" />
      <circle cx="406" cy="228" r="6" />
      <circle
        cx="194"
        cy="228"
        r="34"
        className="fill-surface"
        stroke="currentColor"
        strokeWidth="8"
      />
      <circle cx="194" cy="228" r="20" />
      <circle cx="194" cy="228" r="14" className="fill-surface" />
      <circle cx="194" cy="228" r="6" />
    </g>
  </svg>
);

// Caja abierta — pickup/plataforma sin techo trasero
export const IconFlatbed = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 280"
    width="24"
    height="24"
    fill="#fff"
    {...props}
  >
    <g>
      {/* Cabina - morro más cuadrado */}
      <path d="M 310,200 L 310,88 C 310,78 318,72 328,72 L 345,72 C 375,72 400,82 430,105 L 470,135 C 490,148 500,165 500,185 L 500,200 C 500,207 494,212 486,212 L 452,212 A 42,42 0 0,0 368,212 L 318,212 C 312,212 310,207 310,200 Z" />
      {/* Caja abierta - paneles laterales */}
      <rect x="100" y="132" width="200" height="42" rx="3" />
      {/* Chasis bajo caja */}
      <path d="M 110,178 L 295,178 L 295,212 L 238,212 A 42,42 0 0,0 154,212 L 110,212 C 102,212 100,205 100,198 L 100,185 Z" />
      {/* Ventana cabina */}
      <path
        d="M 350,86 L 420,120 C 430,126 440,140 440,158 L 350,158 Z"
        className="fill-surface"
      />
      {/* Línea puerta */}
      <line
        x1="340"
        y1="86"
        x2="340"
        y2="212"
        className="stroke-surface"
        strokeWidth="3"
      />
      {/* Tirador */}
      <rect
        x="350"
        y="166"
        width="16"
        height="5"
        rx="2"
        className="fill-surface"
      />
      {/* Línea panel caja */}
      <line
        x1="102"
        y1="153"
        x2="298"
        y2="153"
        className="stroke-surface"
        strokeWidth="2"
      />
      {/* Faro delantero */}
      <path
        d="M 460,158 L 495,165 L 492,188 L 458,182 Z"
        className="fill-surface"
      />
      {/* Piloto trasero */}
      <rect x="100" y="140" width="4" height="26" className="fill-surface" />
      {/* Ruedas */}
      <circle
        cx="410"
        cy="212"
        r="34"
        className="fill-surface"
        stroke="currentColor"
        strokeWidth="6"
      />
      <circle cx="410" cy="212" r="20" />
      <circle cx="410" cy="212" r="14" className="fill-surface" />
      <circle cx="410" cy="212" r="6" />
      <circle
        cx="196"
        cy="212"
        r="34"
        className="fill-surface"
        stroke="currentColor"
        strokeWidth="6"
      />
      <circle cx="196" cy="212" r="20" />
      <circle cx="196" cy="212" r="14" className="fill-surface" />
      <circle cx="196" cy="212" r="6" />
    </g>
  </svg>
);

// Camión — cabina separada, caja grande
export const IconTruck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 450"
    width="24"
    height="24"
    fill="#fff"
    {...props}
  >
    <g>
      {/* Chasis */}
      <rect x="70" y="280" width="750" height="24" rx="2" />
      <path d="M 70,304 L 810,304 L 810,360 L 780,360 A 48,48 0 0,0 684,360 L 636,360 A 48,48 0 0,0 540,360 L 480,360 L 480,325 L 390,325 L 390,360 L 360,360 A 48,48 0 0,0 264,360 L 236,360 A 48,48 0 0,0 140,360 L 70,360 Z" />
      {/* Caja herramientas */}
      <rect
        x="400"
        y="318"
        width="70"
        height="32"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="405"
        y="323"
        width="28"
        height="22"
        rx="2"
        className="fill-surface"
      />
      {/* Estabilizadores */}
      <rect x="110" y="295" width="14" height="60" />
      <rect x="100" y="352" width="34" height="8" rx="2" />
      <rect x="480" y="295" width="14" height="60" />
      <rect x="470" y="352" width="34" height="8" rx="2" />
      {/* Cabina */}
      <path d="M 645,290 L 645,180 C 645,170 655,165 665,165 L 775,165 C 790,165 802,175 808,190 L 820,225 L 825,230 C 830,240 830,250 830,265 L 830,300 C 830,307 824,312 816,312 L 780,312 A 48,48 0 0,0 684,312 L 645,312 Z" />
      {/* Ventanas cabina */}
      <path
        d="M 715,180 L 770,180 C 778,180 786,186 790,196 L 798,220 L 715,220 Z"
        className="fill-surface"
      />
      <rect
        x="660"
        y="180"
        width="45"
        height="40"
        rx="3"
        className="fill-surface"
      />
      {/* Puerta */}
      <line
        x1="710"
        y1="175"
        x2="710"
        y2="305"
        className="stroke-surface"
        strokeWidth="3"
      />
      <rect
        x="722"
        y="235"
        width="20"
        height="6"
        rx="2"
        className="fill-surface"
      />
      {/* Parrilla */}
      <rect
        x="805"
        y="260"
        width="20"
        height="30"
        rx="3"
        className="fill-surface"
      />
      <circle cx="680" cy="275" r="5" className="fill-surface" />
      {/* Escape */}
      <rect x="630" y="160" width="12" height="120" rx="2" />
      <path d="M 626,160 L 646,160 L 640,145 L 632,145 Z" />
      {/* Contrapeso */}
      <rect x="65" y="200" width="80" height="60" rx="4" />
      <line
        x1="75"
        y1="210"
        x2="135"
        y2="210"
        className="stroke-surface"
        strokeWidth="3"
      />
      {/* Torreta */}
      <path d="M 140,260 L 350,260 L 340,220 L 290,205 L 140,205 Z" />
      <circle cx="230" cy="235" r="12" className="fill-surface" />
      <circle cx="230" cy="235" r="6" />
      {/* Cabrestante */}
      <circle cx="125" cy="180" r="22" stroke="currentColor" strokeWidth="3" />
      <line
        x1="108"
        y1="172"
        x2="142"
        y2="172"
        className="stroke-surface"
        strokeWidth="2"
      />
      <line
        x1="106"
        y1="178"
        x2="144"
        y2="178"
        className="stroke-surface"
        strokeWidth="2"
      />
      <line
        x1="108"
        y1="184"
        x2="142"
        y2="184"
        className="stroke-surface"
        strokeWidth="2"
      />
      <line
        x1="112"
        y1="190"
        x2="138"
        y2="190"
        className="stroke-surface"
        strokeWidth="2"
      />
      {/* Cilindro hidráulico */}
      <polygon points="320,230 500,165 504,177 324,242" />
      <line
        x1="322"
        y1="236"
        x2="495"
        y2="174"
        className="stroke-surface"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Pluma telescópica */}
      <polygon points="180,215 820,105 823,130 180,240" />
      <polygon
        points="340,195 780,118 782,126 340,203"
        className="fill-surface"
      />
      <path d="M 360,191 L 380,188 L 380,196 Z M 410,182 L 430,179 L 430,187 Z M 460,174 L 480,171 L 480,179 Z M 510,165 L 530,162 L 530,170 Z M 560,157 L 580,154 L 580,162 Z M 610,148 L 630,145 L 630,153 Z M 660,140 L 680,137 L 680,145 Z M 710,131 L 730,128 L 730,136 Z" />
      {/* Extensión telescópica */}
      <polygon
        points="815,108 855,101 857,121 815,128"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Cabeza pluma */}
      <path d="M 855,98 L 880,94 L 885,128 L 855,122 Z" />
      <circle cx="870" cy="108" r="8" className="fill-surface" />
      <circle cx="870" cy="108" r="4" />
      {/* Cable */}
      <line x1="135" y1="162" x2="870" y2="100" strokeWidth="3" />
      <line
        x1="872"
        y1="116"
        x2="872"
        y2="245"
        strokeWidth="3"
        strokeDasharray="10,4"
      />
      {/* Gancho */}
      <g transform="translate(872, 245)">
        <rect x="-12" y="0" width="24" height="28" rx="4" />
        <circle cx="0" cy="12" r="6" className="fill-surface" />
        <rect x="-4" y="28" width="8" height="10" />
        <path d="M 0,38 C -2,46 -18,44 -18,60 C -18,78 4,80 14,68 C 22,58 18,46 12,46 C 8,46 6,50 10,56 C 12,60 6,68 -2,66 C -8,64 -8,54 -2,46 Z" />
      </g>
      {/* Ruedas - 4 ejes */}
      {[188, 312, 588, 732].map((cx) => (
        <g key={cx} transform={`translate(${cx}, 360)`}>
          <circle
            cx="0"
            cy="0"
            r="41"
            className="fill-surface"
            stroke="currentColor"
            strokeWidth="5"
          />
          <circle cx="0" cy="0" r="24" />
          <circle cx="0" cy="0" r="16" className="fill-surface" />
          <circle cx="0" cy="0" r="8" />
          <circle cx="-11" cy="0" r="2" className="fill-surface" />
          <circle cx="11" cy="0" r="2" className="fill-surface" />
          <circle cx="0" cy="-11" r="2" className="fill-surface" />
          <circle cx="0" cy="11" r="2" className="fill-surface" />
        </g>
      ))}
    </g>
  </svg>
);
