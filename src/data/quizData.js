const dongStrokes = [
    { id: 1, d: "M442,606.005h62v16c-50.672,67.344-115,127.844-193,181.5-78,53.672-163.672,97.828-257,132.5l-11-17c55.328-25.344,107.828-54.5,157.5-87.5,49.656-33,95.156-68.828,136.5-107.5,41.328-38.656,76.328-78,105-118Z", targetX: 0, targetY: 0 },
    { id: 2, d: "M63,178.005h735l48-62c12.656,9.344,23.5,18,32.5,26s18.828,16.172,29.5,24.5c10.656,8.344,20.328,16.5,29,24.5-2.672,10.672-11.672,16-27,16H72l-9-29Z", targetX: 0, targetY: 0 },
    { id: 3, d: "M194,313.005v-28l59,28h518v30H248v321c0,1.344-2.344,3.344-7,6-4.672,2.672-10.344,5.344-17,8-6.672,2.672-13.672,4-21,4h-9v-369Z", targetX: 0, targetY: 0 },
    { id: 4, rectX: 225, rectY: 452.005, width: 542, height: 30, targetX: 0, targetY: 0, isStatic: true },
    { id: 5, rectX: 227, rectY: 596.005, width: 542, height: 30, targetX: 0, targetY: 0 },
    { id: 6, d: "M470,44.005l90,10c-1.344,6.672-4.5,12.5-9.5,17.5s-13.844,8.5-26.5,10.5v851c0,2.656-2.172,5.828-6.5,9.5-4.344,3.656-9.844,6.828-16.5,9.5-6.672,2.656-13.344,4-5,4h-11V44.005Z", targetX: 0, targetY: 0, isStatic: true },
    { id: 7, d: "M528,603.005c30.656,41.344,69.828,79.844,117.5,115.5,47.656,35.672,99.828,66.844,156.5,93.5,56.656,26.672,112.328,47.344,167,62l-2,11c-12,1.328-22.672,5.828-32,13.5-9.344,7.656-16,17.828-20,30.5-52.672-19.344-104.5-44.344-155.5-75s-97.844-66.328-140.5-107c-42.672-40.656-78-85.328-106-134l15-10Z", targetX: 0, targetY: 0 },
    { id: 8, d: "M752,313.005h-10l32-36,75,57c-3.344,4-8.844,7.844-16.5,11.5-7.672,3.672-16.5,6.5-26.5,8.5v303c0,2-2.844,4.5-8.5,7.5-5.672,3-12,5.844-19,8.5-7,2.672-13.5,4-19.5,4h-7v-364Z", targetX: 0, targetY: 0 }
];

export const levels = [
    {
        type: 'quiz',
        id: 'q1',
        title: '字型知識測驗',
        question: '請看參考圖，下列何者非正確描述圖片字型之名稱？',
        image: '/images/q1_font_question.jpg',
        points: 4,
        options: [
            { id: 'A', label: 'A', text: '明體', isCorrect: false },
            { id: 'B', label: 'B', text: '宋體', isCorrect: false },
            { id: 'C', label: 'C', text: '明朝體', isCorrect: false },
            { id: 'D', label: 'D', text: '宋朝體', isCorrect: true }
        ]
    },
    {
        type: 'quiz',
        id: 'q2',
        title: '字型知識測驗',
        question: '下圖字型風格是什麼呢？',
        image: '/images/q2_font_question.jpg',
        points: 4,
        options: [
            { id: 'A', label: 'A', text: '魏碑體', isCorrect: true },
            { id: 'B', label: 'B', text: '隸書', isCorrect: false },
            { id: 'C', label: 'C', text: '楷書', isCorrect: false },
            { id: 'D', label: 'D', text: '仿宋體', isCorrect: false }
        ]
    },
    {
        type: 'quiz',
        id: 'q3',
        title: '字型知識測驗',
        question: '請問「國際文字設計協會」正確縮寫為何？',
        image: null,
        points: 4,
        options: [
            { id: 'A', label: 'A', text: 'ATypI', isCorrect: true },
            { id: 'B', label: 'B', text: 'AType', isCorrect: false },
            { id: 'C', label: 'C', text: 'ATypoL', isCorrect: false },
            { id: 'D', label: 'D', text: 'AtyIo', isCorrect: false }
        ]
    },
    {
        type: 'quiz',
        id: 'q4',
        title: '字型知識測驗',
        question: '請問下列哪個字體非由「威鋒數位（華康科技）」製作、設計或代工而成。',
        image: null,
        points: 4,
        options: [
            { id: 'A', label: 'A', text: 'LINE Seed TW', isCorrect: false },
            { id: 'B', label: 'B', text: '微軟正黑體', isCorrect: true },
            { id: 'C', label: 'C', text: '蘋方體', isCorrect: false },
            { id: 'D', label: 'D', text: '新細明體', isCorrect: false }
        ]
    },
    {
        type: 'quiz',
        id: 'q5',
        title: '字型知識測驗',
        question: '下列何者非網頁可支援解析之字體格式？',
        image: null,
        points: 4,
        options: [
            { id: 'A', label: 'A', text: '.woff', isCorrect: false },
            { id: 'B', label: 'B', text: '.otf', isCorrect: false },
            { id: 'C', label: 'C', text: '.ttf', isCorrect: false },
            { id: 'D', label: 'D', text: '.tlc', isCorrect: true }
        ]
    },
    {
        type: 'quiz',
        id: 'q6',
        title: '字型知識測驗',
        question: '下列何種字體為 MacOS 預裝字體？',
        image: '/images/q6.jpg',
        points: 4,
        options: [
            { id: 'A', label: 'A', text: '맑은 고딕', isCorrect: false },
            { id: 'B', label: 'B', text: '新細明體', isCorrect: false },
            { id: 'C', label: 'C', text: 'New York', isCorrect: true },
            { id: 'D', label: 'D', text: 'MS ゴシック', isCorrect: false }
        ]
    },
    {
        type: 'quiz',
        id: 'q7',
        title: '字型知識測驗',
        question: '圖中字形筆畫最可能遵守了何種規範？',
        image: '/images/q7.jpg',
        points: 4,
        options: [
            { id: 'A', label: 'A', text: 'GB-18030', isCorrect: true },
            { id: 'B', label: 'B', text: 'JIS 2004', isCorrect: false },
            { id: 'C', label: 'C', text: '台灣國字標準字體', isCorrect: false },
            { id: 'D', label: 'D', text: 'ISO/IEC 10646', isCorrect: false }
        ]
    },
        {
        type: 'quiz',
        id: 'q8',
        title: '字型知識測驗',
        question: '克里斯因工作來到亞洲某城市，他看到圖中的字體，並且同行友人還提到，這座城市曾有國際大型字體公司之子公司設立於此，請問克里斯最有可能來到哪座城市？',
        image: '/images/q8.jpg',
        points: 4,
        options: [
            { id: 'A', label: 'A', text: '台北', isCorrect: false },
            { id: 'B', label: 'B', text: '吉隆坡', isCorrect: false },
            { id: 'C', label: 'C', text: '東京', isCorrect: false },
            { id: 'D', label: 'D', text: '香港', isCorrect:  true }
        ]
    },
    {
        type: 'bool',
        id: 'tf1',
        title: '字型知識測驗',
        question: '「免費字體即開源字體」該描述是否正確',
        image: null,
        points: 4,
        options: [
            { id: 'T', label: 'O', text: '正確', isCorrect: false },
            { id: 'F', label: 'X', text: '錯誤', isCorrect: true }
        ]
    }, {
        type: 'bool',
        id: 'tf2',
        title: '字型知識測驗',
        question: '〈芫荽〉是由基於 Fontworks 公司之開源字體改作而成？',
        image: null,
        points: 4,
        options: [
            { id: 'T', label: 'O', text: '正確', isCorrect: true },
            { id: 'F', label: 'X', text: '錯誤', isCorrect: false }
        ]
    }, {
        type: 'bool',
        id: 'tf3',
        title: '字型知識測驗',
        question: '黑體亦可稱為方體、無襯線體',
        image: '/images/tf3.jpg',
        points: 4,
        options: [
            { id: 'T', label: 'O', text: '正確', isCorrect: false },
            { id: 'F', label: 'X', text: '錯誤', isCorrect: true }
        ]
    },
    {
        type: 'bool',
        id: 'tf4',
        title: '字型知識測驗',
        question: '上圖風格皆為「義大利斜體（Italic）」。',
        image: '/images/tf4.jpg',
        points: 4,
        options: [
            { id: 'T', label: 'O', text: '正確', isCorrect: false },
            { id: 'F', label: 'X', text: '錯誤', isCorrect: true }
        ]
    },
    {
        type: 'bool',
        id: 'tf5',
        title: '字型知識測驗',
        question: '字體可為向量文件，亦可嵌入點陣圖檔。',
        image: null,
        points: 4,
        options: [
            { id: 'T', label: 'O', text: '正確', isCorrect: true },
            { id: 'F', label: 'X', text: '錯誤', isCorrect: false }
        ]
    },
        {
        type: 'bool',
        id: 'tf5',
        title: '字型知識測驗',
        question: '圖中字體之字形規範，遵照「台灣國字標準字體」。',
        image: '/images/tf6.jpg',
        points: 4,
        options: [
            { id: 'T', label: 'O', text: '正確', isCorrect:false },
            { id: 'F', label: 'X', text: '錯誤', isCorrect: true }
        ]
    },
    {
        type: 'practical',
        id: 'p1',
        title: '術科：組字測驗',
        description: '請拖動筆畫，還原「東」字的結構。',
        points: 8,
        data: dongStrokes
    },
    {
        type: 'bezier',
        id: 'b1',
        title: '術科：貝茲曲線練習',
        description: '拖曳紅色控制點，使曲線回到正常位置。提示：這是思源宋體~',
        points: 8  
    },
    {
        type: 'transform',
        id: 't1',
        title: '術科：部件變形',
        description: '拖曳黑色區塊並通過右下角控制點縮放，使其與文字缺口完美結合。',
        points: 8
        ,
        viewBox: '0 0 1562.676 760',
        targetPath: 'M1061.105,541.512c-30.209-27.118-54.581-66.938-71.059-121.52-15.104,55.954-40.507,95.774-74.148,122.206l-26.432-41.192c44.626-29.179,70.028-85.133,77.237-156.191h-67.969v-45.312h68.998v-81.7h41.537v81.7h67.969v45.312h-65.909c9.955,71.401,38.447,124.953,75.864,156.191l-26.089,40.506Z',
        staticPaths: [
            "M134.276,386.008v-10.299c-21.627,3.09-43.939,5.493-61.79,7.209l-3.776-33.641c3.433,0,6.866-.344,10.299-.344v-87.879h-8.239v-33.298h101.954v33.298h-6.522v124.953h-31.925ZM72.829,534.646v-37.074h71.401v-17.85h-53.895v-33.984h53.895v-16.135h-61.79v-36.387h165.459v36.387h-64.192v16.135h56.641v33.984h-56.641v17.85h72.088v37.074H72.829ZM134.276,261.055h-23.343v11.328h23.343v-11.328ZM134.276,295.383h-23.343v12.357h23.343v-12.357ZM134.276,330.74h-23.343v15.791c7.896-.687,15.447-1.374,23.343-2.403v-13.388ZM177.185,374.336v-141.43h78.61v141.43h-78.61ZM224.557,272.04h-16.477v62.476h16.477v-62.476Z",
            "M270.895,501.349c21.283-7.896,42.566-21.97,54.924-35.357l23.343,28.492c-14.417,19.224-37.073,34.671-55.268,43.253l-22.999-36.388ZM447.339,538.079c-17.508-9.611-41.537-28.148-56.641-43.253v47.372h-41.537v-77.237c-15.79.687-32.268,1.03-49.088,1.03h-16.821l-4.806-42.223c19.224,1.029,38.447,1.716,57.327,1.716,1.03-1.373,2.403-2.402,3.433-3.433-14.417-13.045-30.552-26.433-45.312-36.044l13.388-16.478h-29.865v-74.147h70.716v-19.567h-67.626v-38.79h67.626v-19.224h42.566v19.224h68.312v38.79h-68.312v19.567h71.401v81.356h-37.417c-16.821,18.88-32.269,34.327-46.686,47.716,12.701-.687,25.059-1.373,36.387-2.403-3.089-6.522-5.836-12.701-8.582-17.851l30.209-15.104c10.298,18.881,22.312,47.029,30.208,68.312l-32.268,18.193c-1.373-5.148-3.434-11.328-5.836-17.85-12.358,1.716-24.716,3.089-37.417,4.462v30.209l21.97-28.149c14.074,13.731,35.7,28.149,56.983,37.418l-22.312,36.387ZM316.207,333.829v24.717l1.029-1.373c3.09,2.402,6.18,5.492,9.612,8.238,7.552-9.955,14.761-21.283,20.253-31.582h-30.895ZM423.31,333.829h-67.626l25.06,13.389c-7.896,13.388-17.851,28.148-27.806,40.506l9.269,8.582c12.701-15.104,24.372-30.552,34.671-45.312l26.433,19.224v-36.388Z",
            "M489.558,517.482c14.074-13.73,23.343-26.775,29.521-40.85-10.642,3.433-21.97,5.492-33.984,7.209l-8.925-42.224c16.134-1.029,35.014-3.089,52.521-5.835.687-4.807,1.029-9.955,1.373-15.448h-39.82v-39.133h40.85v-18.537h-45.312v-39.134h45.312v-15.104h38.104v71.402c0,78.953-8.925,122.893-45.655,162.369l-33.984-24.716ZM629.614,279.935v18.194h-39.134v-18.194h-28.835v18.194h-39.134v-18.194h-40.507v-39.477h40.507v-22.656h39.134v22.656h28.835l-.343-22.656h39.477v22.656h40.163v39.477h-40.163ZM581.556,542.198v-233.771h38.79v15.104h45.999v39.134h-45.999v20.253h41.537v39.134h-41.537v23.687h50.806v40.85h-50.806v55.61h-38.79Z",
            "M687.624,532.931v-42.91h43.939v-40.85h-33.984v-141.773h33.984v-37.417h-40.507v-43.253h181.937v43.253h-40.163v37.417h33.642v141.773h-33.642v40.85h43.596v42.91h-188.802ZM793.01,405.918h35.357v-55.268h-35.357v-80.67h-21.97v80.67h-35.357v55.268h35.357v84.103h21.97v-84.103Z",
            "M1270.841,541.169c-13.388-17.164-23.343-35.701-30.895-54.581-9.269,18.88-21.283,37.074-36.73,53.551l-21.97-37.417c15.79-14.418,30.208-33.298,41.536-58.7-6.522-20.939-10.984-43.597-14.074-67.626-2.06,5.149-4.119,9.612-6.179,13.389l-17.851-40.507c1.373-2.746,2.746-5.493,3.775-8.239h-15.104c-3.776,6.18-7.553,12.358-11.672,18.194h25.06v27.118c-5.836,13.045-13.045,26.776-20.254,39.134v5.836c12.358-2.403,24.03-5.149,35.015-8.582v41.536c-10.298,2.747-22.312,5.493-35.015,7.896v14.074c0,49.089-9.955,55.954-47.715,55.954l-13.045-41.879h7.553c15.79,0,19.223-3.434,19.223-20.597v-1.717c-9.955,1.717-19.91,3.09-29.178,4.119l-4.807-41.536c10.642-.687,22.313-1.717,33.984-3.433v-26.776h6.866c3.775-5.148,7.209-11.328,8.925-16.134h-14.761c-8.925,9.269-17.851,17.507-26.775,24.373l-14.418-36.73c15.791-8.926,32.955-24.373,45.656-40.851h-40.164v-36.73h23v-24.029h-16.478v-37.074h16.478v-25.402h33.984v25.402h15.791v24.373c2.746-10.642,5.148-21.283,7.208-32.269l28.149,13.731c-3.776,17.164-10.642,38.104-17.508,55.268h5.493v23.687c11.328-31.582,17.851-72.775,20.253-109.849l34.328,6.179c-1.373,14.074-3.433,28.835-6.18,43.939h46.687v41.536h-7.209c-3.09,52.521-10.642,104.356-22.656,137.998,9.611,21.283,21.283,40.163,32.954,53.551l-21.283,39.82ZM1157.217,304.308c3.775-7.896,6.865-15.791,9.611-24.029h-12.015v24.029h2.403ZM1233.767,309.8l-1.029,3.776c1.373,27.806,4.119,54.925,8.238,79.297,4.463-23.686,7.209-53.895,7.896-83.073h-15.104Z",
            "M1310.657,532.931v-40.164h69.685v-21.97h-54.924v-39.477h54.924v-20.254h-46.342v-74.49h-27.806v-75.178h25.06c-4.12-7.896-9.612-16.821-15.104-25.403l36.388-13.73c6.521,11.671,12.357,25.402,16.477,39.134h10.985v-43.253h39.477v43.253h12.015c5.149-12.015,9.612-24.716,13.045-38.104l38.104,12.358c-3.776,8.925-8.238,17.851-12.358,25.746h23.687v75.178h-29.179v74.49h-46.342v20.254h55.61v39.477h-55.61v21.97h70.715v40.164h-178.504ZM1455.177,301.218h-110.192v18.537h110.192v-18.537ZM1426.685,354.083h-54.581v22.656h54.581v-22.656Z"
        ]    },
    {
        type: 'mole',
        id: 'mole1',
        title: '找出內鬼',
        question: '下列8張圖中，有一張字體與其他不同，請找出它。',
        points: 4,
        options: [
            { id: '1', image: '/images/b1-1.png' },
            { id: '2', image: '/images/b1-2.png' },
            { id: 'mole', image: '/images/b1-3.png' },
            { id: '4', image: '/images/b1-4.png' },
            { id: '5', image: '/images/b1-5.png' },
            { id: '6', image: '/images/b1-6.png' },
            { id: '7', image: '/images/b1-7.png' },
            { id: '8', image: '/images/b1-8.png' }
        ]
    },
        {
        type: 'mole',
        id: 'mole2',
        title: '找出內鬼',
        question: '下列8張圖中，有一張字體與其他不同，請找出它。',
        points: 4,
        options: [
            { id: '1', image: '/images/b2-1.png' },
            { id: '2', image: '/images/b2-2.png' },
            { id: '3', image: '/images/b2-3.png' },
            { id: 'mole', image: '/images/b2-4.png' },
            { id: '5', image: '/images/b2-5.png' },
            { id: '6', image: '/images/b2-6.png' },
            { id: '7', image: '/images/b2-7.png' },
            { id: '8', image: '/images/b2-8.png' }
        ]
    },
        {
        type: 'mole',
        id: 'mole3',
        title: '找出內鬼',
        question: '下列8張圖中，有一張字體與其他不同，請找出它。',
        points: 4,
        options: [
            { id: '1', image: '/images/b3-1.png' },
            { id: 'mole', image: '/images/b3-2.png' },
            { id: '3', image: '/images/b3-3.png' },
            { id: '4', image: '/images/b3-4.png' },
            { id: '5', image: '/images/b3-5.png' },
            { id: '6', image: '/images/b3-6.png' },
            { id: '7', image: '/images/b3-7.png' },
            { id: '8', image: '/images/b3-8.png' }
        ]
    },
        {
        type: 'mole',
        id: 'mole4',
        title: '找出內鬼',
        question: '下列8張圖中，有一張字體與其他不同，請找出它。',
        points: 4,
        options: [
            { id: '1', image: '/images/b4-1.png' },
            { id: '2', image: '/images/b4-2.png' },
            { id: 'mole', image: '/images/b4-3.png' },
            { id: '4', image: '/images/b4-4.png' },
            { id: '5', image: '/images/b4-5.png' },
            { id: '6', image: '/images/b4-6.png' },
            { id: '7', image: '/images/b4-7.png' },
            { id: '8', image: '/images/b4-8.png' }
        ]
    },
        {
        type: 'mole',
        id: 'mole4',
        title: '找出內鬼',
        question: '下列8張圖中，有一張字體與其他不同，請找出它。',
        points: 4,
        options: [
            { id: '1', image: '/images/b5-1.png' },
            { id: '2', image: '/images/b5-2.png' },
            { id: '3', image: '/images/b5-3.png' },
            { id: '4', image: '/images/b5-4.png' },
            { id: '5', image: '/images/b5-5.png' },
            { id: '6', image: '/images/b5-6.png' },
            { id: 'mole', image: '/images/b5-7.png' },
            { id: '8', image: '/images/b5-8.png' }
        ]
    }
];
