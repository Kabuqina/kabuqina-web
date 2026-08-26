/* 关于页首屏右侧的 3D 玻璃浮动物件
   实现要点（每个物件分多层模拟实体玻璃）：
   1. 形体渐变（左上受光 → 边缘微增饱和，产生体积）
   2. 边缘反光描边（白→淡彩→白渐变 stroke）
   3. 镜面高光（左上模糊白斑 + 锐利小反光）
   4. 内部折射亮斑 + 背面反弹光
   5. 底部内阴影（环境光遮蔽，压出厚度）
   注意：无地面投影、无彩色背景渲染，整体颜色淡雅清爽
   主题：爱（爱心+星环、光标）、逻辑（灯泡、齿轮、立方体）、软件（</>、浏览器窗口） */
export default function HeroGlassObjects() {
  return (
    <div className="about2-glass-wrap" aria-hidden="true">
      {/* 爱心 + 星环 —— 极淡粉 3D 玻璃，视觉中心 */}
      <div className="about2-glass about2-glass--heart">
        <svg className="about2-glass__svg" viewBox="0 0 330 250">
          <defs>
            <radialGradient id="hg-body" cx="34%" cy="26%" r="95%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="30%" stopColor="#fad2e4" stopOpacity="0.44" />
              <stop offset="68%" stopColor="#f5b9d3" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#ec9ec5" stopOpacity="0.62" />
            </radialGradient>
            <linearGradient id="hg-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#f8d6e8" stopOpacity="0.58" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="hg-ring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbf4e4" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#f0e0c4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fcf3e2" stopOpacity="0.85" />
            </linearGradient>
            <filter id="hg-b2" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
            <filter id="hg-b5" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          {/* 星环后段（绕到爱心背后） */}
          <path
            d="M18 95 A 142 38 0 0 1 302 95"
            transform="rotate(-13 165 95)"
            fill="none"
            stroke="url(#hg-ring)"
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M18 95 A 142 38 0 0 1 302 95"
            transform="rotate(-13 165 95)"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.35"
          />

          {/* 爱心本体（分层立体结构） */}
          <g transform="translate(88, 30) scale(0.77)">
            <path
              d="M100 164 C 62 134, 22 104, 22 70 C 22 43, 43 26, 67 26 C 82 26, 94 34, 100 46 C 106 34, 118 26, 133 26 C 157 26, 178 43, 178 70 C 178 104, 138 134, 100 164 Z"
              fill="url(#hg-body)"
            />
            {/* 底部内阴影：环境光遮蔽压出厚度 */}
            <path
              d="M100 164 C 62 134, 22 104, 22 70 C 22 43, 43 26, 67 26 C 82 26, 94 34, 100 46 C 106 34, 118 26, 133 26 C 157 26, 178 43, 178 70 C 178 104, 138 134, 100 164 Z"
              fill="none"
              stroke="#d08bb2"
              strokeWidth="12"
              strokeLinejoin="round"
              opacity="0.2"
              filter="url(#hg-b5)"
            />
            {/* 背面反弹光（右下内侧亮线） */}
            <path
              d="M124 30 C 152 36, 170 54, 172 76"
              fill="none"
              stroke="#ffffff"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.42"
              filter="url(#hg-b5)"
            />
            {/* 边缘菲涅尔反光 */}
            <path
              d="M100 164 C 62 134, 22 104, 22 70 C 22 43, 43 26, 67 26 C 82 26, 94 34, 100 46 C 106 34, 118 26, 133 26 C 157 26, 178 43, 178 70 C 178 104, 138 134, 100 164 Z"
              fill="none"
              stroke="url(#hg-edge)"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            {/* 主镜面高光（左上柔和光斑） */}
            <ellipse cx="62" cy="54" rx="27" ry="16" fill="#ffffff" opacity="0.6" transform="rotate(-26 62 54)" filter="url(#hg-b5)" />
            {/* 锐利小反光点 */}
            <ellipse cx="55" cy="48" rx="9" ry="5.5" fill="#ffffff" opacity="0.9" transform="rotate(-26 55 48)" filter="url(#hg-b2)" />
            {/* 左瓣内二次折射 */}
            <ellipse cx="34" cy="88" rx="7" ry="22" fill="#ffd9ec" opacity="0.42" filter="url(#hg-b5)" />
            {/* 内部焦散：光穿过玻璃在底部汇聚 */}
            <ellipse cx="96" cy="136" rx="30" ry="13" fill="#ffd7e9" opacity="0.45" filter="url(#hg-b5)" />
          </g>

          {/* 星环前段（跨在爱心前面） */}
          <path
            d="M18 95 A 142 38 0 0 0 302 95"
            transform="rotate(-13 165 95)"
            fill="none"
            stroke="url(#hg-ring)"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path
            d="M18 95 A 142 38 0 0 0 302 95"
            transform="rotate(-13 165 95)"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.55"
          />
          {/* 星环高光与闪点 */}
          <circle cx="288" cy="76" r="4.5" fill="#fffbea" opacity="0.9" />
          <circle cx="38" cy="116" r="3" fill="#fffbea" opacity="0.75" />
        </svg>
        <span className="about2-glass-spark about2-glass-spark--1" />
        <span className="about2-glass-spark about2-glass-spark--2" />
        <span className="about2-glass-spark about2-glass-spark--3" />
      </div>

      {/* 灯泡 —— 极淡黄 3D 玻璃（逻辑 / 灵感） */}
      <div className="about2-glass about2-glass--bulb">
        <svg className="about2-glass__svg" viewBox="0 0 160 210">
          <defs>
            <radialGradient id="bg-body" cx="36%" cy="26%" r="90%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="32%" stopColor="#fdf6e6" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#faeecf" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#f3e0b6" stopOpacity="0.42" />
            </radialGradient>
            <linearGradient id="bg-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#fbf3e0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.72" />
            </linearGradient>
            <linearGradient id="bg-cap" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f9f1e2" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ecdcc2" stopOpacity="0.7" />
            </linearGradient>
            <filter id="bg-b2" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2" />
            </filter>
            <filter id="bg-b5" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          {/* 玻璃泡壳 */}
          <path
            d="M80 14 C 44 14, 20 40, 20 74 C 20 98, 34 112, 46 126 C 54 135, 58 142, 58 150 L 102 150 C 102 142, 106 135, 114 126 C 126 112, 140 98, 140 74 C 140 40, 116 14, 80 14 Z"
            fill="url(#bg-body)"
          />
          <path
            d="M80 14 C 44 14, 20 40, 20 74 C 20 98, 34 112, 46 126 C 54 135, 58 142, 58 150 L 102 150 C 102 142, 106 135, 114 126 C 126 112, 140 98, 140 74 C 140 40, 116 14, 80 14 Z"
            fill="none"
            stroke="#dcc396"
            strokeWidth="11"
            opacity="0.11"
            filter="url(#bg-b5)"
          />
          <path
            d="M80 14 C 44 14, 20 40, 20 74 C 20 98, 34 112, 46 126 C 54 135, 58 142, 58 150 L 102 150 C 102 142, 106 135, 114 126 C 126 112, 140 98, 140 74 C 140 40, 116 14, 80 14 Z"
            fill="none"
            stroke="url(#bg-edge)"
            strokeWidth="4"
          />
          {/* 右下内侧反弹光 */}
          <path d="M118 106 C 126 96, 132 86, 133 72" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.4" filter="url(#bg-b5)" />
          {/* 主高光 */}
          <ellipse cx="54" cy="52" rx="15" ry="24" fill="#ffffff" opacity="0.62" transform="rotate(18 54 52)" filter="url(#bg-b5)" />
          <ellipse cx="50" cy="46" rx="5" ry="10" fill="#ffffff" opacity="0.9" transform="rotate(18 50 46)" filter="url(#bg-b2)" />
          {/* 焦散 */}
          <ellipse cx="80" cy="112" rx="22" ry="12" fill="#fff6dd" opacity="0.35" filter="url(#bg-b5)" />

          {/* 灯丝 */}
          <path
            d="M66 142 L66 118 C66 109, 76 109, 76 118 L76 112 C76 103, 86 103, 86 112 L86 118 C86 109, 96 109, 96 118 L96 142"
            fill="none"
            stroke="#e8cb96"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M66 142 L66 118 C66 109, 76 109, 76 118 L76 112 C76 103, 86 103, 86 112 L86 118 C86 109, 96 109, 96 118 L96 142"
            fill="none"
            stroke="#fffbee"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* 金属灯头 */}
          <rect x="58" y="152" width="44" height="34" rx="7" fill="url(#bg-cap)" />
          <path d="M58 160 h44" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" opacity="0.75" />
          <path d="M60 170 h40" stroke="#d6c3a0" strokeWidth="1.8" strokeLinecap="round" opacity="0.4" />
          <path d="M62 180 h36" stroke="#d6c3a0" strokeWidth="1.8" strokeLinecap="round" opacity="0.32" />
          <rect x="58" y="152" width="44" height="34" rx="7" fill="none" stroke="#ddc9a6" strokeWidth="1.6" opacity="0.45" />
        </svg>
      </div>

      {/* &lt;/&gt; 括号 —— 极淡紫 3D 玻璃（软件 / 代码） */}
      <div className="about2-glass about2-glass--brackets">
        <svg className="about2-glass__svg" viewBox="0 0 170 150">
          <defs>
            <linearGradient id="xb-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbf9fe" stopOpacity="0.5" />
              <stop offset="55%" stopColor="#ece2f8" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#e0cef2" stopOpacity="0.42" />
            </linearGradient>
            <filter id="xb-b3" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* 厚度暗层（挤出体积） */}
          <g fill="none" stroke="#bda4d8" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" opacity="0.18" transform="translate(3.5, 3.5)">
            <path d="M56 34 L 24 75 L 56 116" />
            <path d="M114 34 L 146 75 L 114 116" />
            <path d="M98 22 L 72 128" />
          </g>
          {/* 玻璃主体 */}
          <g fill="none" stroke="url(#xb-body)" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round">
            <path d="M56 34 L 24 75 L 56 116" />
            <path d="M114 34 L 146 75 L 114 116" />
            <path d="M98 22 L 72 128" />
          </g>
          {/* 顶面高光（左上受光边） */}
          <g fill="none" stroke="#ffffff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" transform="translate(-3, -3.5)">
            <path d="M56 34 L 24 75 L 56 116" />
            <path d="M114 34 L 146 75 L 114 116" />
            <path d="M98 22 L 72 128" />
          </g>
          {/* 底面内侧阴影 */}
          <g fill="none" stroke="#a88cc4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" transform="translate(2.5, 3)">
            <path d="M56 34 L 24 75 L 56 116" />
            <path d="M114 34 L 146 75 L 114 116" />
            <path d="M98 22 L 72 128" />
          </g>
          {/* 柔和镜面光带 */}
          <ellipse cx="52" cy="52" rx="16" ry="8" fill="#ffffff" opacity="0.55" transform="rotate(-52 52 52)" filter="url(#xb-b3)" />
          <ellipse cx="126" cy="46" rx="10" ry="6" fill="#ffffff" opacity="0.45" transform="rotate(48 126 46)" filter="url(#xb-b3)" />
        </svg>
      </div>

      {/* 浏览器窗口卡 —— 极淡蓝 3D 玻璃（软件） */}
      <div className="about2-glass about2-glass--card">
        <span className="about2-card__rim" />
        <div className="about2-card__body">
          <span className="about2-card__bar" />
          <span className="about2-card__dot about2-card__dot--r" />
          <span className="about2-card__dot about2-card__dot--y" />
          <span className="about2-card__dot about2-card__dot--b" />
          <span className="about2-card__line" style={{ width: '40%', marginTop: '16%' }} />
          <span className="about2-card__line about2-card__line--dim" style={{ width: '62%' }} />
          <span className="about2-card__line about2-card__line--dim" style={{ width: '50%' }} />
          <span className="about2-card__line about2-card__line--pink" style={{ width: '36%' }} />
          <span className="about2-card__glare" />
        </div>
      </div>

      {/* 立方体 —— 极淡紫 3D 玻璃（逻辑 / 结构） */}
      <div className="about2-glass about2-glass--cube">
        <svg className="about2-glass__svg" viewBox="0 0 180 170">
          <defs>
            <linearGradient id="cb-top" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.68" />
              <stop offset="100%" stopColor="#f2ecfa" stopOpacity="0.24" />
            </linearGradient>
            <linearGradient id="cb-left" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0e8f9" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#dccdf0" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="cb-right" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e8dcf5" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d2bde9" stopOpacity="0.18" />
            </linearGradient>
            <filter id="cb-b2" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          {/* 三个折射面 */}
          <polygon points="90,14 158,50 90,86 22,50" fill="url(#cb-top)" />
          <polygon points="22,50 90,86 90,158 22,122" fill="url(#cb-left)" />
          <polygon points="90,86 158,50 158,122 90,158" fill="url(#cb-right)" />
          {/* 面与面之间透光叠加 */}
          <polygon points="90,86 158,50 158,122 90,158" fill="#f8f3fd" opacity="0.16" />
          {/* 棱边：受光白边 + 背光暗边 */}
          <g fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinejoin="round" opacity="0.85">
            <path d="M90 14 L158 50 L158 122 L90 158 L22 122 L22 50 Z" />
          </g>
          <path d="M22 122 L90 158 L158 122" fill="none" stroke="#b39cd0" strokeWidth="2.6" opacity="0.2" filter="url(#cb-b2)" />
          <path d="M90 14 L90 86" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
          <path d="M22 50 L90 86 L158 50" fill="none" stroke="#ffffff" strokeWidth="2.2" opacity="0.9" />
          {/* 顶面镜面高光 */}
          <ellipse cx="66" cy="42" rx="24" ry="9" fill="#ffffff" opacity="0.65" transform="rotate(-24 66 42)" filter="url(#cb-b2)" />
          {/* 左面内侧反弹光 */}
          <path d="M30 62 L34 112" stroke="#faf6fd" strokeWidth="5" strokeLinecap="round" opacity="0.45" filter="url(#cb-b2)" />
          {/* 右面焦散 */}
          <ellipse cx="132" cy="98" rx="12" ry="20" fill="#f2eafc" opacity="0.35" filter="url(#cb-b2)" />
          {/* 顶点闪点 */}
          <circle cx="90" cy="14" r="3" fill="#ffffff" opacity="0.9" />
          <circle cx="158" cy="50" r="2.5" fill="#ffffff" opacity="0.75" />
        </svg>
      </div>

      {/* 齿轮 —— 极淡黄 3D 玻璃（逻辑 / 工程） */}
      <div className="about2-glass about2-glass--gear">
        <svg className="about2-glass__svg" viewBox="0 0 160 160">
          <defs>
            <radialGradient id="gg-body" cx="36%" cy="30%" r="85%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.68" />
              <stop offset="45%" stopColor="#fcf6e4" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#f0e2c2" stopOpacity="0.4" />
            </radialGradient>
            <linearGradient id="gg-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#faf1dc" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
            </linearGradient>
            <filter id="gg-b2" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          {/* 齿轮主体（轮齿 + 轮盘一体） */}
          <g fill="url(#gg-body)" stroke="url(#gg-edge)" strokeWidth="2.4" stroke-linejoin="round">
            <rect x="70" y="4" width="20" height="26" rx="7" />
            <rect x="70" y="4" width="20" height="26" rx="7" transform="rotate(45 80 80)" />
            <rect x="70" y="4" width="20" height="26" rx="7" transform="rotate(90 80 80)" />
            <rect x="70" y="4" width="20" height="26" rx="7" transform="rotate(135 80 80)" />
            <rect x="70" y="4" width="20" height="26" rx="7" transform="rotate(180 80 80)" />
            <rect x="70" y="4" width="20" height="26" rx="7" transform="rotate(225 80 80)" />
            <rect x="70" y="4" width="20" height="26" rx="7" transform="rotate(270 80 80)" />
            <rect x="70" y="4" width="20" height="26" rx="7" transform="rotate(315 80 80)" />
            <circle cx="80" cy="80" r="54" />
          </g>
          {/* 外圈受光弧 */}
          <path d="M32 56 A 54 54 0 0 1 80 26" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.65" filter="url(#gg-b2)" />
          {/* 右下反弹光 */}
          <path d="M126 106 A 54 54 0 0 1 96 132" fill="none" stroke="#fffbe8" strokeWidth="4" strokeLinecap="round" opacity="0.35" filter="url(#gg-b2)" />
          {/* 盘面高光 */}
          <ellipse cx="62" cy="56" rx="18" ry="11" fill="#ffffff" opacity="0.58" transform="rotate(-30 62 56)" filter="url(#gg-b2)" />
          {/* 中心孔（透出背景 + 内壁） */}
          <circle cx="80" cy="80" r="14" fill="#fefaf0" opacity="0.28" />
          <circle cx="80" cy="80" r="14" fill="none" stroke="#c9b286" strokeWidth="2.4" opacity="0.32" />
          <path d="M70 70 A 14 14 0 0 0 70 90" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
          {/* 轮辐高光 */}
          <circle cx="80" cy="80" r="30" fill="none" stroke="#ffffff" strokeWidth="1.6" opacity="0.42" />
        </svg>
      </div>

      {/* 光标箭头 —— 极淡粉 3D 玻璃（软件 / 交互） */}
      <div className="about2-glass about2-glass--cursor">
        <svg className="about2-glass__svg" viewBox="0 0 120 140">
          <defs>
            <linearGradient id="pc-body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.72" />
              <stop offset="55%" stopColor="#fce6ef" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#f6cfe0" stopOpacity="0.44" />
            </linearGradient>
            <linearGradient id="pc-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#fdf0f5" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
            </linearGradient>
            <filter id="pc-b2" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          <path d="M22 12 L 102 68 L 64 76 L 84 126 L 66 134 L 47 84 L 22 106 Z" fill="url(#pc-body)" />
          <path d="M22 12 L 102 68 L 64 76 L 84 126 L 66 134 L 47 84 L 22 106 Z" fill="none" stroke="url(#pc-edge)" strokeWidth="4" strokeLinejoin="round" />
          {/* 折角内侧阴影 */}
          <path d="M64 76 L 84 126" fill="none" stroke="#dfa8c4" strokeWidth="6" opacity="0.14" filter="url(#pc-b2)" />
          {/* 顶边受光高光 */}
          <path d="M25 17 L 92 66" fill="none" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" opacity="0.88" />
          <path d="M50 84 L 66 124" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" opacity="0.5" />
          {/* 锐利小反光 */}
          <ellipse cx="36" cy="36" rx="8" ry="4.5" fill="#ffffff" opacity="0.88" transform="rotate(34 36 36)" filter="url(#pc-b2)" />
        </svg>
      </div>

      {/* 四色玻璃气泡 */}
      <span className="about2-glass-bubble about2-glass-bubble--pink" />
      <span className="about2-glass-bubble about2-glass-bubble--yellow" />
      <span className="about2-glass-bubble about2-glass-bubble--purple" />
      <span className="about2-glass-bubble about2-glass-bubble--blue" />
      <span className="about2-glass-bubble about2-glass-bubble--blue about2-glass-bubble--s" />
      <span className="about2-glass-bubble about2-glass-bubble--pink about2-glass-bubble--s" />
    </div>
  )
}
