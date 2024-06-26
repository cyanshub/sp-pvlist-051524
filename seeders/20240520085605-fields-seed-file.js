'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 動態取得 categories 資料表目前的 id 值
    const categories = await queryInterface.sequelize.query('SELECT id FROM categories;', {
      type: queryInterface.sequelize.QueryTypes.SELECT
    })
    const pvCategories = {
      地面型系統: categories[0].id,
      廠房鐵皮屋頂: categories[1].id,
      建築水泥樓面屋頂: categories[2].id,
      畜禽舍屋頂: categories[3].id,
      校園屋頂: categories[4].id,
      其他: categories[5].id
    }

    // 參考再生能源憑證網站寫入資料
    await queryInterface.bulkInsert('fields', [{
      name: '遠東新世紀化纖新埔總廠(北廠)',
      total_amount: 1785,
      remain_amount: 1785,
      trans_amount: 0,
      full_address: '新竹縣新埔鎮文山路亞東段600號',
      local: '新竹縣新埔鎮',
      cover: 'https://www.trec.org.tw/images/site_img_empty.png',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '財團法人工業技術研究院-中興分院',
      total_amount: 3623,
      remain_amount: 863,
      trans_amount: 2760,
      full_address: '新竹縣竹東鎮中興路四段195號',
      local: '新竹縣竹東鎮',
      cover: 'https://www.trec.org.tw/attachment/999442F7-35BE-4448-AD55-7474657E9017',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '竹東汽修廠',
      total_amount: 8,
      remain_amount: 8,
      trans_amount: 0,
      full_address: '新竹縣竹東鎮東峰路357號',
      local: '新竹縣竹東鎮',
      cover: 'https://www.trec.org.tw/attachment/B7D74620-178C-4798-A5C8-608443826FB0',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '旺宏電子股份有限公司員工宿舍ENG棟',
      total_amount: 28,
      remain_amount: 28,
      trans_amount: 0,
      full_address: '新竹市東區明湖路1006巷166、168、186、188、198號',
      local: '新竹市東區',
      cover: 'https://www.trec.org.tw/attachment/3438745D-BE0A-4977-A51B-3C3004F47CA3',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '旺宏電子股份有限公司晶圓五廠P棟',
      total_amount: 62,
      remain_amount: 62,
      trans_amount: 0,
      full_address: '新竹市東區力行四路6號',
      local: '新竹市東區',
      cover: 'https://www.trec.org.tw/attachment/FBA75C55-9093-4BB1-8824-4A2E3BD47D03',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '8E-2A & 8E-FAB',
      total_amount: 2151,
      remain_amount: 2151,
      trans_amount: 0,
      full_address: '新竹市東區力行路17號',
      local: '新竹市東區',
      cover: 'https://www.trec.org.tw/attachment/B60D1811-DF4C-416A-8934-BF450D15B125',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '旺宏電子股份有限公司活動中心',
      total_amount: 72,
      remain_amount: 72,
      trans_amount: 0,
      full_address: '新竹市東區力行路16-2號',
      local: '新竹市東區',
      cover: 'https://www.trec.org.tw/attachment/67382426-7BCE-4448-93E3-AB03851B5228',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '晶圓二廠',
      total_amount: 324,
      remain_amount: 324,
      trans_amount: 0,
      full_address: '新竹市東區力行路9號',
      local: '新竹市東區',
      cover: 'https://www.trec.org.tw/attachment/01CFA0AE-A395-4173-8A48-C18FB09321B5',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '智原科技股份有限公司',
      total_amount: 131,
      remain_amount: 131,
      trans_amount: 0,
      full_address: '新竹市東區力行三路5號',
      local: '新竹市東區',
      cover: 'https://www.trec.org.tw/attachment/99E50F38-4788-49A4-A351-34562F8CAECF',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '力積電新竹廠區',
      total_amount: 381,
      remain_amount: 381,
      trans_amount: 0,
      full_address: '新竹市東區新竹科學園區新竹市力行一路12號',
      local: '新竹市東區',
      cover: 'https://www.trec.org.tw/attachment/2463CEED-6554-4FDE-9BD2-08DEC7E6FDC2',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '8A-FAB',
      total_amount: 580,
      remain_amount: 580,
      trans_amount: 0,
      full_address: '新竹市東區力行二路3號',
      local: '新竹市東區',
      cover: 'https://www.trec.org.tw/attachment/6F566AB4-CB9B-40FE-A92E-0D3A0E3337C5',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '8F-FAB',
      total_amount: 773,
      remain_amount: 773,
      trans_amount: 0,
      full_address: '新竹市東區力行二路3號',
      local: '新竹市東區',
      cover: 'https://www.trec.org.tw/attachment/8FC4D97F-687E-4337-941A-F0B7D6C200F5',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '友達光電GRC企業總部',
      total_amount: 94,
      remain_amount: 94,
      trans_amount: 0,
      full_address: '新竹市東區科學園區工業東三路1號',
      local: '新竹市東區',
      cover: 'https://www.trec.org.tw/attachment/A9F5483E-5DA0-4DA5-BE96-659B9E017886',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '乾坤科技新竹總部',
      total_amount: 417,
      remain_amount: 417,
      trans_amount: 0,
      full_address: '新竹縣寶山鄉研發二路2號',
      local: '新竹縣寶山鄉',
      cover: 'https://www.trec.org.tw/attachment/4A82BF9F-FC9D-4BDE-BCE1-A6885A956B78',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '8S',
      total_amount: 218,
      remain_amount: 218,
      trans_amount: 0,
      full_address: '新竹縣寶山鄉研新一路16號',
      local: '新竹縣寶山鄉',
      cover: 'https://www.trec.org.tw/attachment/FA9FBF92-6286-4C20-B888-FC9759D3F3A4',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '聯穎光電股份有限公司',
      total_amount: 531,
      remain_amount: 531,
      trans_amount: 0,
      full_address: '新竹縣寶山鄉創新一路10號',
      local: '新竹縣寶山鄉',
      cover: 'https://www.trec.org.tw/attachment/6013167D-F57E-4DD8-82CD-74F33957A444',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '瑞昱半導體股份有限公司二廠發電站',
      total_amount: 34,
      remain_amount: 34,
      trans_amount: 0,
      full_address: '新竹市東區園區二路9號',
      local: '新竹市東區',
      cover: 'https://www.trec.org.tw/attachment/D60A8C7F-CF40-4861-BD68-6F0F0578CCA8',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '瑞昱半導體股份有限公司-竹科一廠(停車棟)',
      total_amount: 86,
      remain_amount: 86,
      trans_amount: 0,
      full_address: '新竹縣寶山鄉創新二路2號',
      local: '新竹縣寶山鄉',
      cover: 'https://www.trec.org.tw/attachment/C910C610-1DF1-4A18-BAF1-3CD594A1F5E7',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.其他
    }, {
      name: '財團法人工業技術研究院-光復院區',
      total_amount: 67,
      remain_amount: 35,
      trans_amount: 32,
      full_address: '新竹市東區光復路2段321號',
      local: '新竹市東區',
      cover: 'https://www.trec.org.tw/attachment/FC98EB8B-FFC0-434C-8027-47DF5ECB2222',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '新竹_巨城',
      total_amount: 96,
      remain_amount: 96,
      trans_amount: 0,
      full_address: '新竹市東區中央路229、233、233之1、233之2、223之3、235、237、239、241、243、243之1號、民權路152、156、158、160、162、166、168、170、172、176號、中央路245巷5號',
      local: '新竹市東區',
      cover: 'https://www.trec.org.tw/images/site_img_empty.png',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '第一商業銀行股份有限公司東門分行',
      total_amount: 0,
      remain_amount: 0,
      trans_amount: 0,
      full_address: '新竹市北區東門街216號',
      local: '新竹市北區',
      cover: 'https://www.trec.org.tw/attachment/E826DE58-6531-4242-9705-9A37584D82A6',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '渣打國際商業銀行股份有限公司(中正分行)',
      total_amount: 3,
      remain_amount: 3,
      trans_amount: 0,
      full_address: '新竹市北區中正路326號',
      local: '新竹市東區',
      cover: 'https://www.trec.org.tw/attachment/1C338513-7A05-4D0D-87D0-2A612D0B2896',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '國泰人壽保險股份有限公司',
      total_amount: 155,
      remain_amount: 96,
      trans_amount: 59,
      full_address: '新竹縣竹北市隘口里4鄰高鐵七路167號、169號、高鐵東二路6號',
      local: '新竹縣竹北市',
      cover: 'https://www.trec.org.tw/images/site_img_empty.png',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '臺灣新光商業銀行股份有限公司',
      total_amount: 12,
      remain_amount: 12,
      trans_amount: 0,
      full_address: '新竹縣竹北市文興路一段388號',
      local: '新竹縣竹北市',
      cover: 'https://www.trec.org.tw/attachment/39AAAA6B-21E8-4AB7-ABD3-A0BA77C271E4',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '遠東新世紀化纖新埔總廠(南廠)',
      total_amount: 203,
      remain_amount: 203,
      trans_amount: 0,
      full_address: '新竹縣新埔鎮文山路亞東段369號',
      local: '新竹縣新埔鎮',
      cover: 'https://www.trec.org.tw/attachment/BA0C77EF-4BF5-41B6-BE1C-64B43C75A807',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '遠東新世紀化纖新埔總廠(北廠)',
      total_amount: 1785,
      remain_amount: 1785,
      trans_amount: 0,
      full_address: '新竹縣新埔鎮文山路亞東段600號',
      local: '新竹縣新埔鎮',
      cover: 'https://www.trec.org.tw/images/site_img_empty.png',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '玉衡智慧能源股份有限公司',
      total_amount: 44122,
      remain_amount: 0,
      trans_amount: 44122,
      full_address: '屏東縣佳冬鄉昌南段、佳和段、新埔段及武丁段等110筆地號',
      local: '屏東縣佳冬鄉',
      cover: 'https://www.trec.org.tw/attachment/68FF1D2A-58CC-4AD1-865E-0A3F5B817908',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.地面型系統
    }, {
      name: '聯詠科技股份有限公司竹北分公司',
      total_amount: 240,
      remain_amount: 240,
      trans_amount: 0,
      full_address: '新竹縣竹北市台元二街9號',
      local: '新竹縣竹北市',
      cover: 'https://www.trec.org.tw/attachment/FD095CB5-607B-41D6-A1D0-08D343001588',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '交通部台灣鐵路管理局 竹北站',
      total_amount: 34,
      remain_amount: 28,
      trans_amount: 6,
      full_address: '新竹縣竹北市和平街59號',
      local: '新竹縣竹北市',
      cover: 'https://www.trec.org.tw/attachment/684FC647-8747-484C-AC99-3B8231733546',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '順益新竹',
      total_amount: 0,
      remain_amount: 0,
      trans_amount: 0,
      full_address: '新竹縣竹北市環北路二段68號',
      local: '新竹縣竹北市',
      cover: 'https://www.trec.org.tw/attachment/28F88B99-C655-4ED9-B7DD-815AFF70255D',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '捷亮科技股份有限公司',
      total_amount: 0,
      remain_amount: 0,
      trans_amount: 0,
      full_address: '新竹縣竹北市環北路三段173號',
      local: '新竹縣竹北市',
      cover: 'https://www.trec.org.tw/attachment/3A8B9C53-BF79-424C-B93F-CE629482273D',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '正隆股份有限公司竹北廠',
      total_amount: 11927,
      remain_amount: 11927,
      trans_amount: 0,
      full_address: '新竹縣竹北市大義里長青路二段300號',
      local: '新竹縣竹北市',
      cover: 'https://www.trec.org.tw/attachment/9EAF40B6-8EDF-4BA6-B5E1-0FF5F0E91ED0',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.其他
    }, {
      name: '尚閎科技股份有限公司',
      total_amount: 0,
      remain_amount: 0,
      trans_amount: 0,
      full_address: '新竹縣湖口鄉鳳工路8號、8號二樓',
      local: '新竹縣湖口鄉',
      cover: 'https://www.trec.org.tw/attachment/5A1DD34A-1E72-4A3D-905E-A8BAEEAC6E80',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '力成科技(P9棟)',
      total_amount: 226,
      remain_amount: 226,
      trans_amount: 0,
      full_address: '新竹縣湖口鄉文化路4號',
      local: '新竹縣湖口鄉',
      cover: 'https://www.trec.org.tw/attachment/C17A329A-69EE-4021-8BC1-09E2F2F7449B',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '立達一',
      total_amount: 423,
      remain_amount: 423,
      trans_amount: 0,
      full_address: '新竹縣湖口鄉光復路65、67號',
      local: '新竹縣湖口鄉',
      cover: 'https://www.trec.org.tw/attachment/D89A1754-0777-454C-AB1F-14B5510B8EBA',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '立達三',
      total_amount: 449,
      remain_amount: 449,
      trans_amount: 0,
      full_address: '新竹縣湖口鄉光復路22、24號',
      local: '新竹縣湖口鄉',
      cover: 'https://www.trec.org.tw/attachment/53193931-3AA0-4C5C-BCBA-A38429EFFD32',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '台灣資生堂股份有限公司新竹工廠',
      total_amount: 33,
      remain_amount: 33,
      trans_amount: 0,
      full_address: '新竹縣湖口鄉光復北路60號',
      local: '新竹縣湖口鄉',
      cover: 'https://www.trec.org.tw/attachment/A690CA87-06C1-4F5E-8D7E-B4A1F4AE382C',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '頎邦光復廠46.23kW',
      total_amount: 57,
      remain_amount: 57,
      trans_amount: 0,
      full_address: '新竹縣湖口鄉光復路12號',
      local: '新竹縣湖口鄉',
      cover: 'https://www.trec.org.tw/attachment/12C17828-AD2F-488C-91B8-0D8D426F863F',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '艾克爾T3 423.32kwp',
      total_amount: 0,
      remain_amount: 0,
      trans_amount: 0,
      full_address: '新竹縣湖口鄉光復路11號',
      local: '新竹縣湖口鄉',
      cover: 'https://www.trec.org.tw/attachment/1D50C814-AEB4-45FE-AD58-DE99A0607E3A',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '艾克爾T5 113.24kwp',
      total_amount: 0,
      remain_amount: 0,
      trans_amount: 0,
      full_address: '新竹縣湖口鄉光復北路39號',
      local: '新竹縣湖口鄉',
      cover: 'https://www.trec.org.tw/attachment/274A0489-93E6-4447-904F-2862098C6D7E',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '道達爾能源股份有限公司',
      total_amount: 38,
      remain_amount: 38,
      trans_amount: 0,
      full_address: '新竹縣湖口鄉光復北路26、28號',
      local: '新竹縣湖口鄉',
      cover: 'https://www.trec.org.tw/attachment/354421F9-647E-4A35-AE71-2728CBCBED7B',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '新竹縣全家新豐屋頂型太陽光電案場',
      total_amount: 0,
      remain_amount: 0,
      trans_amount: 0,
      full_address: '新竹縣新豐鄉中崙289之3、289之5號',
      local: '新竹縣新豐鄉',
      cover: 'https://www.trec.org.tw/attachment/F6EA9D7A-0CAE-475D-8F72-6B21828D7F0A',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '隆門PV0032',
      total_amount: 0,
      remain_amount: 0,
      trans_amount: 0,
      full_address: '新竹縣新豐鄉新和路198-1號',
      local: '新竹縣新豐鄉',
      cover: 'https://www.trec.org.tw/attachment/064AA74C-C3F5-4170-BEAA-DF47EDF66199',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '遠東新世紀股份有限公司(機車棚+宿舍+紡織廠-大停車場)',
      total_amount: 467,
      remain_amount: 467,
      trans_amount: 0,
      full_address: '新竹縣湖口鄉和興路30號',
      local: '新竹縣湖口鄉',
      cover: 'https://www.trec.org.tw/attachment/875586D6-344F-4321-92CB-971E32C81F23',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.地面型系統
    }, {
      name: '陽光屋頂湖口東楊路自用電站',
      total_amount: 2,
      remain_amount: 2,
      trans_amount: 0,
      full_address: '新竹縣湖口鄉東楊路437巷1號',
      local: '新竹縣湖口鄉',
      cover: 'https://www.trec.org.tw/attachment/0E9351E7-CDE5-4716-AE9D-EBE867B5AF41',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '台灣山葉機車工業股份有限公司',
      total_amount: 0,
      remain_amount: 0,
      trans_amount: 0,
      full_address: '新竹縣湖口鄉東興村山葉路81號',
      local: '新竹縣湖口鄉',
      cover: 'https://www.trec.org.tw/attachment/4E830C32-7530-42CD-9588-59349F84CFF9',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.地面型系統
    }, {
      name: '交通部台灣鐵路管理局北湖站',
      total_amount: 22,
      remain_amount: 15,
      trans_amount: 7,
      full_address: '新竹縣湖口鄉東興村12鄰北湖路1號',
      local: '新竹縣湖口鄉',
      cover: 'https://www.trec.org.tw/attachment/0BB66FFD-DBC8-40BB-8702-065AD9749DEE',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '亞力電機股份有限公司(電材大樓)',
      total_amount: 326,
      remain_amount: 326,
      trans_amount: 0,
      full_address: '桃園市楊梅區中山南路800巷202號',
      local: '桃園市楊梅區',
      cover: 'https://www.trec.org.tw/attachment/D2E8BD12-0382-45E3-877B-6B6AA3562D39',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '桃園市楊梅區338.83瓩',
      total_amount: 1,
      remain_amount: 0,
      trans_amount: 1,
      full_address: '桃園市楊梅區楊湖路一段279號',
      local: '桃園市楊梅區',
      cover: 'https://www.trec.org.tw/attachment/4C16FA39-DD8E-4493-B9D2-40AFB6BA2ED7',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '臺北市政府消防局寶橋分隊',
      total_amount: 17,
      remain_amount: 16,
      trans_amount: 1,
      full_address: '臺北市文山區臺北市文山區樟新街2號',
      local: '臺北市文山區',
      cover: 'https://www.trec.org.tw/attachment/5D110F19-1D6D-4CFC-9DA1-0DD9091CB850',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '臺北市文山區公所',
      total_amount: 44,
      remain_amount: 44,
      trans_amount: 0,
      full_address: '臺北市文山區木柵路3段220號',
      local: '臺北市文山區',
      cover: 'https://www.trec.org.tw/attachment/3A78B9B4-4395-45F6-920E-5AEA25F32BED',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '臺北市立動物園',
      total_amount: 138,
      remain_amount: 138,
      trans_amount: 0,
      full_address: '臺北市文山區新光路二段30號',
      local: '臺北市文山區',
      cover: 'https://www.trec.org.tw/attachment/0A9326DD-812E-419F-BC66-6CE716C614A8',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '臺北市政府產業發展局 興隆市場',
      total_amount: 223,
      remain_amount: 107,
      trans_amount: 116,
      full_address: '臺北市文山區興隆路2段97號',
      local: '臺北市文山區',
      cover: 'https://www.trec.org.tw/attachment/35910E5B-D458-4E35-B182-3354AE15FF8C',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '台北自來水長興淨水廠太陽光電發電廠',
      total_amount: 621,
      remain_amount: 0,
      trans_amount: 621,
      full_address: '臺北市大安區長興街131號(臺北自來水事業處)',
      local: '臺北市大安區',
      cover: 'https://www.trec.org.tw/attachment/39E45A68-B6B3-43C4-8126-D1DFF73CD8F5',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '第一學生宿舍太陽能發電站',
      total_amount: 43,
      remain_amount: 43,
      trans_amount: 0,
      full_address: '臺北市大安區基隆路 4 段 43 號',
      local: '臺北市大安區',
      cover: 'https://www.trec.org.tw/attachment/F0BCAF85-D1FD-40DD-96BE-3CD3EEBF0361',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.校園屋頂
    }, {
      name: '次震宇宙館',
      total_amount: 8,
      remain_amount: 8,
      trans_amount: 0,
      full_address: '臺北市大安區台北市羅斯福路4段1號',
      local: '臺北市大安區',
      cover: 'https://www.trec.org.tw/attachment/FA76A6B2-D494-4C4C-B795-B51FF247FD04',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '學新館',
      total_amount: 18,
      remain_amount: 18,
      trans_amount: 0,
      full_address: '臺北市大安區臺北市羅斯福路四段一號',
      local: '臺北市大安區"',
      cover: 'https://www.trec.org.tw/attachment/CCC34754-E097-47E7-997A-1F050DD65D8E',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.校園屋頂
    }, {
      name: '臺北市大安區公所行政中心',
      total_amount: 13,
      remain_amount: 13,
      trans_amount: 0,
      full_address: '臺北市大安區新生南路二段86號',
      local: '臺北市大安區',
      cover: 'https://www.trec.org.tw/attachment/DB18AEEA-148C-40B0-A8E3-F5F74A6589D6',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '臺北市立金華國民中學',
      total_amount: 149,
      remain_amount: 149,
      trans_amount: 0,
      full_address: '臺北市大安區新生南路二段32號',
      local: '臺北市大安區',
      cover: 'https://www.trec.org.tw/attachment/05A2D19D-88DC-448B-8530-5F1577381493',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.校園屋頂
    }, {
      name: '大安森林公園',
      total_amount: 25,
      remain_amount: 25,
      trans_amount: 0,
      full_address: '臺北市大安區信義路3段100號',
      local: '臺北市大安區',
      cover: 'https://www.trec.org.tw/attachment/B1C6F573-C4CB-426E-8A92-3B7F1B7FF852',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '中華電信股份有限公司',
      total_amount: 0,
      remain_amount: 0,
      trans_amount: 0,
      full_address: '臺北市中正區信義路一段21-3號',
      local: '臺北市中正區',
      cover: 'https://www.trec.org.tw/attachment/C5116B9B-99BF-45AA-85AA-923EA387A70F',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '台北市政府產業發展局 南門市場',
      total_amount: 115,
      remain_amount: 115,
      trans_amount: 0,
      full_address: '臺北市中正區羅斯福路1段8號',
      local: '臺北市中正區',
      cover: 'https://www.trec.org.tw/attachment/B62E0BED-8A2A-4E6D-8F73-43E82A94E051',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '太陽圖書館',
      total_amount: 43,
      remain_amount: 43,
      trans_amount: 0,
      full_address: '臺北市萬華區青年路65號(青年公園內)',
      local: '臺北市萬華區',
      cover: 'https://www.trec.org.tw/attachment/58E47911-16D4-4FAC-AB87-FD754749D3CA',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '臺北市立萬華國民中學',
      total_amount: 36,
      remain_amount: 36,
      trans_amount: 0,
      full_address: '臺北市萬華區西藏路201號',
      local: '臺北市萬華區',
      cover: 'https://www.trec.org.tw/attachment/EFA7B2D5-BA52-4286-9222-713721DED442',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.校園屋頂
    }, {
      name: '臺北市立龍山國民中學',
      total_amount: 0,
      remain_amount: 0,
      trans_amount: 0,
      full_address: '臺北市萬華區南寧路46號',
      local: '臺北市萬華區',
      cover: 'https://www.trec.org.tw/attachment/63BDF285-649A-480D-BCD0-DADC2CDBF003',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.校園屋頂
    }, {
      name: '東吳大學城中校區第二大樓圖書館',
      total_amount: 0,
      remain_amount: 0,
      trans_amount: 0,
      full_address: '臺北市中正區延平南路129巷4號',
      local: '臺北市中正區',
      cover: 'https://www.trec.org.tw/attachment/965FC849-989A-4C41-A42C-2885FDC6D136',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.校園屋頂
    }, {
      name: '玉山博愛',
      total_amount: 14,
      remain_amount: 14,
      trans_amount: 0,
      full_address: '臺北市中正區永綏街5號',
      local: '臺北市中正區',
      cover: 'https://www.trec.org.tw/attachment/32691F23-2A9B-4A6A-9139-40C875EC551C',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '中油大樓',
      total_amount: 36,
      remain_amount: 36,
      trans_amount: 0,
      full_address: '臺北市信義區松仁路3號',
      local: '臺北市信義區',
      cover: 'https://www.trec.org.tw/attachment/5D79A251-697A-4E14-B6F0-A90C47E6B2CF',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '臺北市立南港高級工業職業學校',
      total_amount: 23,
      remain_amount: 23,
      trans_amount: 0,
      full_address: '臺北市南港區興中路29號',
      local: '臺北市南港區',
      cover: 'https://www.trec.org.tw/attachment/AE2BD1D8-B41B-413E-87C5-C8F109C03265',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.校園屋頂
    }, {
      name: '臺灣水泥股份有限公司台北水泥製品廠',
      total_amount: 23,
      remain_amount: 23,
      trans_amount: 0,
      full_address: '新北市汐止區大同路一段310號',
      local: '新北市汐止區',
      cover: 'https://www.trec.org.tw/attachment/304CB70B-B7EB-46BD-AE63-3AB22E180339',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '臺北市內湖區麗湖國民小學',
      total_amount: 147,
      remain_amount: 147,
      trans_amount: 0,
      full_address: '臺北市內湖區金湖路363巷8號',
      local: '臺北市內湖區',
      cover: 'https://www.trec.org.tw/attachment/B649733F-B1CC-4620-AC67-81B98992B6CD',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.校園屋頂
    }, {
      name: '國泰人壽內湖台聯電訊大樓',
      total_amount: 8,
      remain_amount: 8,
      trans_amount: 0,
      full_address: '臺北市內湖區內湖路一段120巷15弄25號',
      local: '臺北市內湖區',
      cover: 'https://www.trec.org.tw/attachment/9E23BB69-E908-47B2-8AB2-550D316A0215',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '台達電子工業股份有限公司 瑞光大樓',
      total_amount: 109,
      remain_amount: 109,
      trans_amount: 0,
      full_address: '臺北市內湖區瑞光路186號',
      local: '臺北市內湖區',
      cover: 'https://www.trec.org.tw/attachment/B18FB3DD-8498-4E57-B611-CF18F0946D09',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '國泰世華商業銀行股份有限公司-瑞湖分行',
      total_amount: 4,
      remain_amount: 4,
      trans_amount: 0,
      full_address: '台北市內湖區陽光街２９２號１樓',
      local: '臺北市內湖區',
      cover: 'https://www.trec.org.tw/attachment/735BB9E4-0E7E-461C-AEFC-C225332A0D94',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '詠馨-詠生電廠',
      total_amount: 3,
      remain_amount: 3,
      trans_amount: 0,
      full_address: '臺北市北投區幽雅路19號',
      local: '臺北市北投區',
      cover: 'https://www.trec.org.tw/attachment/7DF52C78-A31C-4513-8138-9E71E2A63714',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '臺北市北投區公所',
      total_amount: 63,
      remain_amount: 63,
      trans_amount: 0,
      full_address: '臺北市北投區新市街30號',
      local: '臺北市北投區',
      cover: 'https://www.trec.org.tw/attachment/42432789-CB40-4D68-88B9-9D2CB54577E1',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '德淵企業股份有限公司 總公司',
      total_amount: 1,
      remain_amount: 1,
      trans_amount: 0,
      full_address: '新北市五股區五權六路 9 號',
      local: '新北市五股區',
      cover: 'https://www.texyear.com/data/editor/images/德淵總部太陽能發電設備.png',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '明志科技大學 (創新樓)',
      total_amount: 377,
      remain_amount: 377,
      trans_amount: 0,
      full_address: '新北市泰山區工專路84號',
      local: '新北市泰山區',
      cover: 'https://www.trec.org.tw/attachment/7FFEAF33-2FC9-414E-9FA1-972F3A85405E',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.校園屋頂
    }, {
      name: '臺北大眾捷運股份有限公司-新莊機廠屋頂型太陽光電系統',
      total_amount: 419,
      remain_amount: 0,
      trans_amount: 419,
      full_address: '新北市新莊區中正路760號',
      local: '新北市新莊區',
      cover: 'https://www.trec.org.tw/attachment/47330A7B-9536-49DD-8EE4-13675157A3C2',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '凌華科技股份有限公司(一)',
      total_amount: 7,
      remain_amount: 7,
      trans_amount: 0,
      full_address: '桃園市龜山區華亞一路66號',
      local: '桃園市龜山區',
      cover: 'https://www.trec.org.tw/attachment/6AFADDBC-EE2E-401F-AB75-D8A7E9E0F3B9',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '臺灣水泥股份有限公司台北水泥製品廠桃園分廠',
      total_amount: 582,
      remain_amount: 582,
      trans_amount: 0,
      full_address: '桃園市蘆竹區南山路二段220號',
      local: '桃園市蘆竹區',
      cover: 'https://www.trec.org.tw/attachment/99F493C1-2474-493C-81F2-EC83ECC0B454',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '桃園沙崙案-設備操作室、桃園沙崙案-污水處理廠',
      total_amount: 143,
      remain_amount: 143,
      trans_amount: 0,
      full_address: '桃園市大園區沙崙里7鄰沙園五路38號',
      local: '桃園市大園區',
      cover: 'https://www.trec.org.tw/attachment/6A501495-5726-4DBA-8259-A897A1CB4B0D',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '勤益物流園區一-三期',
      total_amount: 0,
      remain_amount: 0,
      trans_amount: 0,
      full_address: '桃園市大園區國際路一段88號',
      local: '桃園市大園區',
      cover: 'https://www.trec.org.tw/attachment/B0E33CDD-9AB9-4CAC-BD5A-ED7F761E1F70',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '渣打國際商業銀行股份有限公司(三民分行)',
      total_amount: 0,
      remain_amount: 0,
      trans_amount: 0,
      full_address: '桃園市桃園區三民路三段301號',
      local: '桃園市桃園區',
      cover: 'https://www.trec.org.tw/attachment/66B36047-839A-452C-B780-8CDC3E4A3EAA',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '台達電子工業股份有限公司 桃園研發中心',
      total_amount: 742,
      remain_amount: 742,
      trans_amount: 0,
      full_address: '桃園市桃園區興隆路18號',
      local: '桃園市桃園區',
      cover: 'https://www.trec.org.tw/attachment/E17227F7-B0CE-41F8-A152-CCB630425435',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '全漢三廠',
      total_amount: 34,
      remain_amount: 34,
      trans_amount: 0,
      full_address: '桃園市桃園區興隆路6號',
      local: '桃園市桃園區',
      cover: 'https://www.trec.org.tw/attachment/C13A7B0F-866D-4F69-9EB9-29268C636DDF',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '全漢總廠',
      total_amount: 10,
      remain_amount: 10,
      trans_amount: 0,
      full_address: '桃園市桃園區建國東路22號',
      local: '桃園市桃園區',
      cover: 'https://www.trec.org.tw/attachment/1035DABA-0235-41F4-AF6F-58EA04605E77',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '明基材料股份有限公司建東廠(BMC)',
      total_amount: 34,
      remain_amount: 34,
      trans_amount: 0,
      full_address: '桃園市龜山區建國東路29號',
      local: '桃園市龜山區',
      cover: 'https://www.trec.org.tw/attachment/A71FF8EE-8B5E-4445-83AF-16B59BA07480',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '金元福包裝企業股份有限公司',
      total_amount: 27,
      remain_amount: 27,
      trans_amount: 0,
      full_address: '新北市鶯歌區建國路399號',
      local: '新北市鶯歌區',
      cover: 'https://www.trec.org.tw/attachment/C73105D3-0385-4D16-8011-71E467EB6188',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '承美機械有限公司-桃園市大溪區',
      total_amount: 313,
      remain_amount: 313,
      trans_amount: 0,
      full_address: '桃園市大溪區大鶯路1619號',
      local: '桃園市大溪區',
      cover: 'https://www.trec.org.tw/attachment/217D3CFB-265B-4905-83A2-DE1AC02B2247',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '敏鈞精密屋頂型249.69kWp',
      total_amount: 238,
      remain_amount: 238,
      trans_amount: 0,
      full_address: '新北市三峽區三樹路222巷33號',
      local: '新北市三峽區',
      cover: 'https://www.trec.org.tw/attachment/8AEC6E4E-C0F0-44FE-9205-5E77A7A83792',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.廠房鐵皮屋頂
    }, {
      name: '沙崙綠能科技示範場域',
      total_amount: 603,
      remain_amount: 603,
      trans_amount: 0,
      full_address: '臺南市歸仁區武東里10鄰高發二路360號',
      local: '臺南市歸仁區',
      cover: 'https://www.trec.org.tw/attachment/11EA3CCC-2DBE-4EDA-BDAE-1F4A6F2302FA',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.建築水泥樓面屋頂
    }, {
      name: '財團法人工業技術研究院-六甲院區',
      total_amount: 3223,
      remain_amount: 227,
      trans_amount: 2996,
      full_address: '臺南市六甲區工研路8號',
      local: '臺南市六甲區',
      cover: 'https://www.trec.org.tw/attachment/3D2D6E5C-4973-4B80-BBF1-0187035AE27D',
      created_at: new Date(),
      updated_at: new Date(),
      category_id: pvCategories.地面型系統
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fields', null, {})
  }
}
