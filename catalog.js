/* ============================================================================
   Rizky Bayu — constellation detail catalog
   ----------------------------------------------------------------------------
   One entry per constellation star (keys match .constellation-node[data-id]).
   Everything here is DATA ONLY: URLs point at the externally hosted media
   (Instagram / TikTok / Drive / SoundCloud / GitHub / Docs / BlendKit), so the
   repository keeps no local media files.

   PER-CATEGORY FIELDS
     title   heading of the detail submenu
     blurb   one-sentence intro under the heading
     accent  sunset-palette accent for this category (no green anywhere)
     layout  how the pieces are arranged — rail | grid | cinema | audio | tech
     thumb   Drive id of the constellation thumbnail, used as the soft backdrop
             of placeholder tiles (never downloaded into the repo)
     compact denser grid (for the big 12-piece category)

   PER-ITEM FIELDS
     t   title            d  one-line description          p  platform key
     u   canonical link   e  embed payload, absent = link-only card
     thumb  Drive id used for a real thumbnail (falls back to the plate art)
     shape  portrait | square | vertical | wide | poster
     tag  small meta label    alt  secondary link {label, u}
     gallery  extra Drive ids shown as a screenshot strip
   ========================================================================== */
window.RIZKYBY_CATALOG = {
  order: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
  categories: {
    '1': {
      title: '3D Motion Graphics',
      blurb: 'Animated 3D scenes blending typography, objects and dynamic camera motion.',
      accent: '#ff9d66',
      layout: 'rail',
      thumb: '1_WMwkBJZ8HK_9L6tj9Tju1nQaQHk5WYY',
      items: [
        { t: 'Ramadan 2026 Celebration', p: 'instagram', e: 'DVAAJk6FAx0', shape: 'vertical', tag: 'Reel',
          u: 'https://www.instagram.com/p/DVAAJk6FAx0/',
          d: 'Illuminated crescent geometry, floating lanterns, ambient golden particles.' },
        { t: 'UTBK 2026 Motion & Code', p: 'instagram', e: 'DYw6a_qTa1U', shape: 'vertical', tag: 'Reel',
          u: 'https://www.instagram.com/p/DYw6a_qTa1U/',
          d: 'Terminal command streams, cyber lighting and rhythmic hacker typography.' },
        { t: 'Product Motion Showcase — Part 1', p: 'instagram', e: 'DMzrefzvxnM', shape: 'vertical', tag: 'Reel',
          u: 'https://www.instagram.com/p/DMzrefzvxnM/',
          d: 'Commercial product animation: sweeping camera moves, materials, fluid light.' },
        { t: 'Product Motion Showcase — Part 2', p: 'instagram', e: 'DM0Tcx9vNOX', shape: 'vertical', tag: 'Reel',
          u: 'https://www.instagram.com/p/DM0Tcx9vNOX/',
          d: 'Second pass on the same commercial set: harder cuts, closer macro framing.' },
        { t: 'Piano & Musical Note Rain', p: 'instagram', e: 'DKonumiSbB2', shape: 'vertical', tag: 'Scene',
          u: 'https://www.instagram.com/p/DKonumiSbB2/',
          d: 'A grand piano under a continuous downpour of physical sheet-music notes.' }
      ]
    },
    '2': {
      title: 'Realistic 3D Render',
      blurb: 'Photorealistic renders exploring light, materials and architectural mood.',
      accent: '#ffb98a',
      layout: 'grid',
      thumb: '1zypRz7qBbwYNa9dZe57fUaBZ21spUalM',
      items: [
        { t: 'Lakeside Sanctuary', p: 'instagram', e: 'DYvvJbXkmjn', shape: 'portrait', tag: 'Render',
          u: 'https://www.instagram.com/p/DYvvJbXkmjn/',
          d: 'Waterside deck and lounge chair bathed in tranquil twilight illumination.' },
        { t: 'Curved Origami Gallery', p: 'instagram', e: 'DRZH4ZwkmBj', shape: 'portrait', tag: 'Archviz',
          u: 'https://www.instagram.com/p/DRZH4ZwkmBj/',
          d: 'Folded-paper architecture with daylight bounce and raw concrete textures.' },
        { t: 'Abandoned Room & Laptop', p: 'instagram', e: 'C868K1jymmw', shape: 'portrait', tag: 'Story',
          u: 'https://www.instagram.com/p/C868K1jymmw/',
          d: 'Dusty forgotten workstation, volumetric sun shafts, decaying concrete.' },
        { t: 'Morning Tea Still Life', p: 'instagram', e: 'C4LROTsyVNZ', shape: 'portrait', tag: 'Still Life',
          u: 'https://www.instagram.com/p/C4LROTsyVNZ/',
          d: 'Blender 4.0 study: authentic glass refraction, condensation, brass kettle.' },
        { t: 'Rolls Royce Phantom V', p: 'instagram', e: 'C9FIGbTSd5N', shape: 'portrait', tag: 'Hard Surface',
          u: 'https://www.instagram.com/p/C9FIGbTSd5N/',
          d: 'Exacting automotive reproduction: clearcoat reflections, studio lighting.' },
        { t: 'Warm Interior Study', p: 'instagram', e: 'DMzqo-Tv8kM', shape: 'portrait', tag: 'Interior',
          u: 'https://www.instagram.com/p/DMzqo-Tv8kM/',
          d: 'Natural ambient daylight balanced against warm indoor accents and materials.' }
      ]
    },
    '3': {
      title: 'Isometric',
      blurb: 'Cozy isometric dioramas and miniature room studies, built one day at a time.',
      accent: '#ffd08a',
      layout: 'grid',
      compact: true,
      thumb: '1J6zlCclCzvJdGVXvqnsB_cz2xSI0dMvg',
      items: [
        { t: 'Akyas Lounge & Office — Day 28', p: 'instagram', e: 'DH0IoOgyL6g', shape: 'square', tag: 'Finale',
          u: 'https://www.instagram.com/p/DH0IoOgyL6g/',
          d: 'Closing entry of the consecutive series: a personalised farewell workspace.' },
        { t: 'Military Memorial Room — Day 27', p: 'instagram', e: 'DH0IS42SUR3', shape: 'square', tag: 'Day 27',
          u: 'https://www.instagram.com/p/DH0IS42SUR3/',
          d: 'Heritage quarters with medals, authentic posters and balanced foliage.' },
        { t: 'Living Space 01', p: 'instagram', e: 'DIcXik2zBSr', shape: 'square', tag: 'Series',
          u: 'https://www.instagram.com/p/DIcXik2zBSr/', d: 'Isometric room study with custom miniature props.' },
        { t: 'Living Space 02', p: 'instagram', e: 'DH0IAD4SdiY', shape: 'square', tag: 'Series',
          u: 'https://www.instagram.com/p/DH0IAD4SdiY/', d: 'Controlled studio palette, hand-placed small objects.' },
        { t: 'Living Space 03', p: 'instagram', e: 'DH0HqA6yshD', shape: 'square', tag: 'Series',
          u: 'https://www.instagram.com/p/DH0HqA6yshD/', d: 'Warm interior cluster with layered detail depth.' },
        { t: 'Living Space 04', p: 'instagram', e: 'DH0HJSIyCYD', shape: 'square', tag: 'Series',
          u: 'https://www.instagram.com/p/DH0HJSIyCYD/', d: 'Compact room layout, tight prop spacing.' },
        { t: 'Living Space 05', p: 'instagram', e: 'DH0G5O2Sfjr', shape: 'square', tag: 'Series',
          u: 'https://www.instagram.com/p/DH0G5O2Sfjr/', d: 'Soft daylight study through miniature windows.' },
        { t: 'Living Space 06', p: 'instagram', e: 'DH0GiezSdaC', shape: 'square', tag: 'Series',
          u: 'https://www.instagram.com/p/DH0GiezSdaC/', d: 'Furniture set dressing and material variation pass.' },
        { t: 'Living Space 07', p: 'instagram', e: 'DH0GNj1yizY', shape: 'square', tag: 'Series',
          u: 'https://www.instagram.com/p/DH0GNj1yizY/', d: 'Corner composition with balanced colour accents.' },
        { t: 'Living Space 08', p: 'instagram', e: 'C3KzVawyzwz', shape: 'square', tag: 'Part 2',
          u: 'https://www.instagram.com/p/C3KzVawyzwz/', d: 'Second collection opener: tighter scale, denser detail.' },
        { t: 'Living Space 09', p: 'instagram', e: 'C53W7NuSJSj', shape: 'square', tag: 'Series',
          u: 'https://www.instagram.com/p/C53W7NuSJSj/', d: 'Systematic isometric exploration of room aesthetics.' },
        { t: 'Living Space 10', p: 'instagram', e: 'DH0IAD4SdiY', shape: 'square', tag: 'Series',
          u: 'https://www.instagram.com/p/DH0IAD4SdiY/', d: 'Closing frame of the isometric living-space run.' }
      ]
    },
    '4': {
      title: 'Surrealism',
      blurb: 'Dreamlike 3D scenes with impossible geometry and emotive colour.',
      accent: '#e08cff',
      layout: 'grid',
      thumb: '1GX8LSY9fgmtD_EizTKTkGhA48eW6a7JJ',
      items: [
        { t: 'Ethereal Spatial Landscape I', p: 'instagram', e: 'C11xXl0B_OF', shape: 'portrait', tag: 'Dreamscape',
          u: 'https://www.instagram.com/p/C11xXl0B_OF/',
          d: 'Gravity-defying geometries and an impossible horizon.' },
        { t: 'Ethereal Spatial Landscape II', p: 'instagram', e: 'C3bes_TSWtC', shape: 'portrait', tag: 'Dreamscape',
          u: 'https://www.instagram.com/p/C3bes_TSWtC/',
          d: 'Second passage: softer palette, deeper atmospheric falloff.' },
        { t: 'Surreal Study I', p: 'instagram', e: 'C8yw6uCyxMz', shape: 'portrait', tag: 'Study',
          u: 'https://www.instagram.com/p/C8yw6uCyxMz/',
          d: 'Emotive colour balancing against abstract spatial forms.' },
        { t: 'Surreal Study II', p: 'instagram', e: 'C81SoaoyvMy', shape: 'portrait', tag: 'Study',
          u: 'https://www.instagram.com/p/C81SoaoyvMy/',
          d: 'Scale play and negative space pushed to the limit.' }
      ]
    },
    '5': {
      title: 'Astronomy',
      blurb: 'Cosmic-scale simulations of nebulae, planetary alignment and stellar light.',
      accent: '#9aa6ff',
      layout: 'cinema',
      thumb: '1V9npfNKz5U6w3T2-UXjkYK_EDN8V9pZ1',
      items: [
        { t: 'Celestial Orbital Dynamics I', p: 'instagram', e: 'C9CVPMnyBRe', shape: 'wide', tag: 'Simulation',
          u: 'https://www.instagram.com/p/C9CVPMnyBRe/',
          d: 'Deep-space nebulae, planetary alignments and volumetric stellar illumination.' },
        { t: 'Celestial Orbital Dynamics II', p: 'instagram', e: 'DQ6PsyZErxM', shape: 'wide', tag: 'Simulation',
          u: 'https://www.instagram.com/p/DQ6PsyZErxM/',
          d: 'Continuation of the orbital study, longer timings and closer passes.' },
        { t: 'Deep Field Study', p: 'instagram', e: 'DRDhwJVEmZF', shape: 'wide', tag: 'Study',
          u: 'https://www.instagram.com/p/DRDhwJVEmZF/',
          d: 'Wide stellar field with layered depth and simulated sensor bloom.' }
      ]
    },
    '6': {
      title: 'VFX & Dynamics',
      blurb: 'Physics-driven destruction and simulation work.',
      accent: '#ff6f5e',
      layout: 'rail',
      thumb: '1URq7Kyy2s_8-kCApk_0v6J1rC80egrME',
      items: [
        { t: 'Collapsing Road VFX Sequence', p: 'instagram', e: 'DMzpw5zPtLg', shape: 'vertical', tag: 'Destruction',
          u: 'https://www.instagram.com/p/DMzpw5zPtLg/',
          d: 'Roadway surface collapse with detailed fracturing debris and dust.' },
        { t: 'RPS Simulation VFX', p: 'tiktok', e: '7518345418858712327', shape: 'vertical', tag: 'TikTok',
          u: 'https://www.tiktok.com/@rizkybayu354/video/7518345418858712327',
          d: 'Real-life rock-paper-scissors physical simulation.' },
        { t: 'Car Assembling VFX', p: 'tiktok', e: '7527315017427979528', shape: 'vertical', tag: 'TikTok',
          u: 'https://www.tiktok.com/@rizkybayu354/video/7527315017427979528',
          d: 'Mechanical vehicle components assembling in sequence.' }
      ]
    },
    '7': {
      title: 'Procedural Modeling',
      blurb: 'Node-based generators published as reusable assets.',
      accent: '#c07bff',
      layout: 'tech',
      thumb: '1bzbGobWwoNLVTX8_xG_uMvmC76W9o56B',
      items: [
        { t: 'Procedural Staircase Generator', p: 'instagram', e: 'DcQsphEy-_1', shape: 'portrait', tag: 'Geometry Nodes',
          u: 'https://www.instagram.com/p/DcQsphEy-_1/',
          d: 'Parametric staircase asset generated in Blender Geometry Nodes, published on BlendKit.' },
        { t: 'Curve to Stairs', p: 'blendkit', tag: 'Geometry Node', thumb: 'https://public.blenderkit.com/thumbnails/assets/316be27d8839494d96c8ccccf71efdea/files/thumbnail_439db1c0-6b89-4dba-86b9-57252999d76f.png.512x512_q85.png', u: 'https://blendkit.com/asset-gallery-detail/316be27d-8839-494d-96c8-ccccf71efdea/?query=author_id%3A1305503', d: 'Powerful tool to turn curves to stairs with custom precise adjustment.' },
        { t: 'Interpolate Factor', p: 'blendkit', tag: 'Geometry Node', thumb: 'https://public.blenderkit.com/thumbnails/assets/45e0fb0228f74d44a6d0950c0a179001/files/thumbnail_3f88260a-8ae4-4823-9897-735311a086cb.png.512x512_q85.png', u: 'https://blendkit.com/asset-gallery-detail/a0e80466-b627-4d6c-a649-d0dfb8223a31/?query=author_id%3A1305503', d: 'Math interpolations node groups for geometry nodes.' },
        { t: 'Bayer Dithering Convert', p: 'blendkit', tag: 'Geometry Node', thumb: 'https://public.blenderkit.com/thumbnails/assets/6fe9f00843574c2999bc62903493051f/files/thumbnail_a362c27a-0908-4133-8281-d258a0132ea9.png.512x512_q85.png', u: 'https://blendkit.com/asset-gallery-detail/6fe9f008-4357-4c29-99bc-62903493051f/?query=author_id%3A1305503', d: 'Effects node groups for bayer dithering conversion.' },
        { t: 'Procedural Halftone', p: 'blendkit', tag: 'Geometry Node', thumb: 'https://public.blenderkit.com/thumbnails/assets/c4a60c95024441e3a30b515554e0ad3c/files/thumbnail_deab7982-ea9e-47ba-b07c-65f106facbbb.png.512x512_q85.png', u: 'https://blendkit.com/asset-gallery-detail/c4a60c95-0244-41e3-a30b-515554e0ad3c/?query=author_id%3A1305503', d: 'Procedural halftone effects node groups.' },
        { t: 'Pixelate Vector', p: 'blendkit', tag: 'Geometry Node', thumb: 'https://public.blenderkit.com/thumbnails/assets/6064db868d584f0e9156e35ced5bccdd/files/thumbnail_956f089d-edbe-4e52-a22e-4608731e01ec.png.512x512_q85.jpg', u: 'https://blendkit.com/asset-gallery-detail/6064db86-8d58-4f0e-9156-e35ced5bccdd/?query=author_id%3A1305503', d: 'Effects node group for pixelating vector data.' },
        { t: 'Instance Nest Pack', p: 'blendkit', tag: 'Geometry Node', thumb: 'https://public.blenderkit.com/thumbnails/assets/1f7302027ab842b0bb9066db64acbd8e/files/thumbnail_67b8dbec-6fe7-4e50-b5dd-270f9c8e3b77.png.512x512_q85.png', u: 'https://blendkit.com/asset-gallery-detail/1f730202-7ab8-42b0-bb90-66db64acbd8e/?query=author_id%3A1305503', d: 'Edit and object mode node groups for instance nesting.' },
        { t: 'Unicodes 17.0 to String', p: 'blendkit', tag: 'Geometry Node', thumb: 'https://public.blenderkit.com/thumbnails/assets/4cdcb032052d4e5aa04210d833e5bffc/files/thumbnail_1a64cda4-5d48-4de5-b48f-7075fb39c556.png.512x512_q85.png', u: 'https://blendkit.com/asset-gallery-detail/4cdcb032-052d-4e5a-a042-10d833e5bffc/?query=author_id%3A1305503', d: 'String tools utility for unicode 17.0 conversion.' },
        { t: 'String to Unicodes 17.0', p: 'blendkit', tag: 'Geometry Node', thumb: 'https://public.blenderkit.com/thumbnails/assets/8cc60bb6b08444f9bf09c0df84afb4bf/files/thumbnail_b65e9449-9d5c-400e-9768-888f881b23f6.png.512x512_q85.png', u: 'https://blendkit.com/asset-gallery-detail/8cc60bb6-b084-44f9-bf09-c0df84afb4bf/?query=author_id%3A1305503', d: 'String tools utility for unicode 17.0 conversion.' }
      ]
    },
    '8': {
      title: 'Audio & Music',
      blurb: 'Original composition and vocal engineering.',
      accent: '#ff8fb1',
      layout: 'audio',
      thumb: '1Wa92wz8qP9GSZqTVhIvakBlaCngMewxe',
      items: [
        { t: 'Project No. 7466', p: 'soundcloud', shape: 'wide', tag: 'Original Music',
          e: 'https://soundcloud.com/rizky-bayuu/project-no-7466',
          u: 'https://soundcloud.com/rizky-bayuu/project-no-7466',
          d: 'Synthwave composition across six sequenced movements: driving basslines, arpeggios, melody.' },
        { t: 'Drama CAI 2025 — Vocal Engineering', p: 'drive', e: '1jE-CGjSDF2QoDXhjDVnOZeuB4_XEBTJA', shape: 'wide', tag: 'Audio Engineering',
          u: 'https://drive.google.com/file/d/1jE-CGjSDF2QoDXhjDVnOZeuB4_XEBTJA/view',
          d: 'Voice acting, dialogue cleanup, dynamic vocal enhancement and sound design for PPM BKI.' }
      ]
    },
    '9': {
      title: 'Code & Systems',
      blurb: 'Software, systems and infrastructure I build and run.',
      accent: '#7fd1ff',
      layout: 'tech',
      thumb: '16xvVB422oWcBh8U_1gQ4YGSoMcAEQJp3',
      items: [
        { t: 'RizkybyMONITOR', p: 'github', tag: 'Linux Telemetry',
          u: 'https://github.com/rizkybayuu/RizkybyMONITOR',
          d: 'Real-time hardware monitor: CPU cores, RAM hierarchy, ZRAM, thermal sensors, processes.',
          eAlt: 'https://www.instagram.com/p/Dc3zoGzS4En/',
          alt: { label: 'Instagram post', u: 'https://www.instagram.com/p/Dc3zoGzS4En/', p: 'instagram' } },
        { t: 'SkyRetail POS Suite', p: 'doc', tag: 'In Development',
          u: 'https://docs.google.com/document/d/1PGssgb0CkpTtyDHWvQbK3STq-moCR9Ez/edit?usp=drive_link',
          d: 'Desktop retail point-of-sale architecture: fast local transactions, inventory indexing, offline stability.' },
        { t: 'Writepath Creative Suite', p: 'doc', tag: 'In Development',
          u: 'https://docs.google.com/document/d/14G46WrN2gyP800BlGsMvbq0dAlqPe3U0/edit?usp=drive_link',
          d: 'Novel & story authoring suite on Rust/Tauri v2 with neural translation and local-first files.' },
        { t: 'Virtual Machine & OS Installation', p: 'instagram', tag: 'Systems',
          u: 'https://www.instagram.com/p/Dc72_ssSybI/',
          alt: { label: 'Instagram post', u: 'https://www.instagram.com/p/Dc72_ssSybI/', p: 'instagram' },
          gallery: ['165A0UQe9kwIc0KzM2u-QLe3_QT_87r8a', '1UDEeLKiFjsHSIfJWWNKjyhtMP5cUmOkk', '1tZsysFylBdMKOyrKoqfTy20uG35vbshA'],
          d: 'Hands-on deployment across VM hypervisors, retro Windows environments and bare-metal Void Linux.' },
        { t: 'rizkyby.web.github.io', p: 'web', tag: 'This site',
          u: 'https://rizkyby.web.github.io/',
          d: 'The portfolio you are looking at: vanilla HTML, CSS and JS by hand, no framework.' }
      ]
    },
    '10': {
      title: 'Graphic Design',
      blurb: 'Editorial layout, print engineering and procedural raster pipelines.',
      accent: '#ffc46b',
      layout: 'grid',
      thumb: '1zZkTg6KCPVigWifQ68eHdwH_pjDfgQFK',
      items: [
        { t: 'Bitmap Shader Pipeline', p: 'drive', e: '1ekEOYbhGESw2Dy9bGUzpJ_PTtZvR6eVf', thumb: '1ekEOYbhGESw2Dy9bGUzpJ_PTtZvR6eVf', shape: 'poster', tag: 'Procedural',
          u: 'https://drive.google.com/file/d/1ekEOYbhGESw2Dy9bGUzpJ_PTtZvR6eVf/view',
          d: 'Blender Geometry Nodes scattering feeding a modern Affinity raster dither pipeline.' },
        { t: 'Dither Study', p: 'drive', e: '1ubmjRmoxP0OYZP4oF78H055yWbgOUI0g', thumb: '1ubmjRmoxP0OYZP4oF78H055yWbgOUI0g', shape: 'poster', tag: 'Procedural',
          u: 'https://drive.google.com/file/d/1ubmjRmoxP0OYZP4oF78H055yWbgOUI0g/view',
          d: 'Second pass on the procedural bitmap aesthetic, heavier dither masks.' },
        { t: 'YEARBOOK 25 Publication', p: 'drive', e: '1-ittBfeoloB273J0gI9WA7rhITm3CoMx', shape: 'poster', tag: 'Editorial',
          u: 'https://drive.google.com/file/d/1-ittBfeoloB273J0gI9WA7rhITm3CoMx/view',
          d: 'Full-format commemorative yearbook: editorial design, typography lockups, layout engineering.' },
        { t: 'Magazine Perfect & Motion Sequence', p: 'drive', e: '1HuAMsS2i2uSsdHEqV5ilpdFKe1gh-Jsw', shape: 'poster', tag: 'Editorial + Motion',
          u: 'https://drive.google.com/file/d/1HuAMsS2i2uSsdHEqV5ilpdFKe1gh-Jsw/view',
          alt: { label: 'Instagram post', u: 'https://www.instagram.com/p/DK50YJIgD99/', p: 'instagram' },
          d: 'Stylised magazine artwork synchronised with a fluid 3D commercial motion sequence.' }
      ]
    },
    '11': {
      title: 'Video Editing',
      blurb: 'Pacing, beat synchronisation and colour treatment for social video.',
      accent: '#b18cff',
      layout: 'cinema',
      thumb: '1D0Q1PrshZRGyfE5jUYuJXANdunNMF4xd',
      items: [
        { t: 'Cinematic Rhythm — Reel', p: 'drive', e: '1qLo_qkzzpYTNesiCakT9zoHGRXQvJvnr', thumb: '1qLo_qkzzpYTNesiCakT9zoHGRXQvJvnr', shape: 'wide', tag: 'Feature',
          u: 'https://drive.google.com/file/d/1qLo_qkzzpYTNesiCakT9zoHGRXQvJvnr/view',
          d: 'Beat-synced cuts, colour treatment and narrative micro-pacing.' },
        { t: 'Cinematic Rhythm — Social Cut', p: 'tiktok', e: '7578757396319800583', shape: 'vertical', tag: 'TikTok',
          u: 'https://www.tiktok.com/@rizkybayu354/video/7578757396319800583',
          d: 'Vertical edit of the same sequence, re-timed for the social feed.' }
      ]
    }
  }
};
