const mode = import.meta.env.VITE_MODE;
export var dbg: any;
if (mode === "dev") {
  console.warn(">>>>>> You are in dev mode.");
  dbg = function (...args: any[]) {
    for (let i = 0; i < args.length; i++) {
      var arg = args[i];
      if (typeof args[i] === "object") {
        arg = JSON.stringify(args[i], null, 2);
      }
      if (i === 0) {
        console.warn(`>>>>>> ${arg}`);
      } else {
        console.warn(`       ${arg}`);
      }
    }
  };
} else {
  console.warn(">>>>>> You are in prod mode.");
  dbg = undefined;
}

// TODO: remove this line in production

// export let userChannelId: string = "RibbitRibbit365";

// const s3_path: string = "https://d2irtorupa9e8g.cloudfront.net";

// export const mockUserWatch: UserWatch = {
//   activePostIds: [
//     "kIo2BAubO6k",
//     "KosgUhdAL5w",
//     "31FpW6CMmYE",
//     "4hBpLHqBSOg",
//     "oZozNrtbg-o",
//   ],
//   inactivePostIds: ["6SDtf0M3fRo"],
// };

// export const mockPostWithCrawlIds: string[] = [
//   "kIo2BAubO6k::dklr3kd1",
//   "KosgUhdAL5w",
//   "31FpW6CMmYE::dklr3kd3",
//   "4hBpLHqBSOg::dklr3kd4",
//   "oZozNrtbg-o::dklr3kd5",
//   "6SDtf0M3fRo::dklr3kd6",
// ];

// export const mockPostWithCrawlResponse: PostWithCrawlResponse[] = [
//   {
//     post: {
//       postId: "kIo2BAubO6k",
//       postTitle: '中国的"国库"竟然不止一个? 美国的国库竟然...',
//       postLink: "https://www.youtube.com/watch?v=kIo2BAubO6k",
//       postThumbnailUrl: s3_path + "/crabcrabgo_test/kIo2BAubO6k.jpg",
//       postSummary:
//         "上期咱们聊了全球十大主权基金里面的6个。 今天咱们接着来揭晓更重磅的部分，来看一看全世界最大的三大国家主权基金~",
//       postCreatedAtCommunityTime: new Date("2025-03-14T14:42:27"),
//       postLastCommentTime: new Date("2025-03-14T14:42:27"),
//       postLastCrawledTime: new Date("2025-03-14T14:42:27"),
//       channelId: "xiao_lin_shuo",
//       channelTitle: "小Lin说",
//       channelLink: "https://www.youtube.com/@xiao_lin_shuo",
//       channelThumbnailUrl: s3_path + "/crabcrabgo_test/xiao_lin_shuo.jpg",
//     },
//     crawl: {
//       crawlId: "dklr3kd1",
//       crawlTime: new Date("2025-03-14T14:42:27"),
//     },
//     commentsWithActions: [
//       {
//         id: "UgwMsCwqipSLtK0I5tl4AaABAg",
//         communityCommentId: "UgwMsCwqipSLtK0I5tl4AaABAg",
//         postId: "kIo2BAubO6k",
//         authorName: "@xiao_lin_shuo",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/dDOuCyzkVBwGapJot3mAGqq1_2_sng7pgnPtkGF1uSmcleO4p6O4Ox6flFzwF7vYDiuNv2I_mA=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCilwQlk62k1z7aUEZPOB6yw",
//         createdAtCommunityTime: new Date("2025-03-14T14:42:27"),
//         parentId: null,
//         content:
//           '\u670b\u53cb\u4eec\u4e45\u7b49\u4e86\u54c8\uff0c\u4e0b\u671f\u7ec8\u4e8e\u6765\u4e86\uff0c\u8fd8\u66f4\u7cbe\u5f69\u54e6\u6709\u6ca1\u6709\ud83d\ude02\u611f\u8c22moomoo\u5bf9\u89c6\u9891\u7684\u652f\u6301\u3002\u4e00\u7ad9\u5f0f\u6295\u8d44\u5168\u7403\u8d44\u4ea7\u7528\u5bcc\u9014 moomoo\uff0c\u5c0fLin\u4e13\u5c5e\u5168\u7403\u72ec\u5bb6\u798f\u5229\uff0c\u82f1\u4f1f\u8fbe\u80a1\u7968\u514d\u8d39\u9001\uff1a<a href="https://start.moomoo.com/02NiDU">https://start.moomoo.com/02NiDU</a><br>\u9999\u6e2f\u5730\u533a\uff1a<a href="https://start.futunn.com/01Tw1T">https://start.futunn.com/01Tw1T</a><br>\u9886\u53d6\u9ad8\u6536\u76ca\u5b58\u94b1\u7075\u6d3b\u73b0\u91d1\u6536\u76ca\u8ba1\u5212\u5927\u793c\uff0c\u66f4\u6709\u60ca\u559c\u73b0\u91d1\u53ca\u514d\u8d39\u80a1\u7968\u5f00\u6237\u4f18\u60e0~',
//         likeCount: 220,
//         actions: [],
//         isSubmitted: false,
//         crawlId: "dklr3kd1",
//       },
//       {
//         id: "UgymJIz2aQri80BMqMR4AaABAg",
//         communityCommentId: "UgymJIz2aQri80BMqMR4AaABAg",
//         postId: "kIo2BAubO6k",
//         authorName: "@weiw1028",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_nBLBcqzFdQnQ5QfPlIZAiF_9IHb99T1gI3RLXd6cbqYtsA=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCHL7_b9b-JHSPPLYR2QEwbQ",
//         createdAtCommunityTime: new Date("2025-03-16T23:30:17"),
//         parentId: null,
//         content: "\u54c7 \u8fd9\u671f\u592a\u68d2\u4e86",
//         likeCount: 0,
//         actions: [{ type: "Delete", desc: "" }],
//         isSubmitted: true,
//         crawlId: "dklr3kd1",
//       },
//       {
//         id: "UgytdGJJ1Vut_wvbrvt4AaABAg",
//         communityCommentId: "UgytdGJJ1Vut_wvbrvt4AaABAg",
//         postId: "kIo2BAubO6k",
//         authorName: "@paualmini",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_lOEX89iKrNNLDSUf_Z5FOUkV_8Q7oAeAvDdV30lqtTs7w=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UC3GTbw76EAvWs1AFk0DgXHQ",
//         createdAtCommunityTime: new Date("2025-03-16T23:27:44"),
//         parentId: null,
//         content: "\u65b0\u53d1\u578b\u5f88\u597d\u770b \u563b\u563b",
//         likeCount: 0,
//         actions: [],
//         isSubmitted: false,
//         crawlId: "dklr3kd1",
//       },
//       {
//         id: "UgwJDLtMborZCTCYTER4AaABAg",
//         communityCommentId: "UgwJDLtMborZCTCYTER4AaABAg",
//         postId: "kIo2BAubO6k",
//         authorName: "@zhengcao6529",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_mlIqm0dHdwGpxxst85aKUthIX2HNuRkYZQzrdx3HY=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCx0_129o4mllem3IWEcaRJg",
//         createdAtCommunityTime: new Date("2025-03-16T22:54:03"),
//         parentId: null,
//         content:
//           "\u6562\u4e0d\u6562\u8bb2\u8fd9\u5341\u4e2a\u56fd\u5bb6\u57fa\u91d1\u54ea\u4e2a\u8d5a\u94b1\uff0c\u54ea\u4e2a\u8d54\u94b1\uff1f",
//         likeCount: 0,
//         actions: [
//           { type: "Dislike", desc: "" },
//           { type: "Reply", desc: "hoho haha hehe" },
//         ],
//         isSubmitted: false,
//         crawlId: "dklr3kd1",
//       },
//       {
//         id: "UgwPu8XtxR6YLzdqflx4AaABAg",
//         communityCommentId: "UgwPu8XtxR6YLzdqflx4AaABAg",
//         postId: "kIo2BAubO6k",
//         authorName: "@QigangDing",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_k40RWE_g69humquYu6aIJoPrWWp7Nn4a9sSyNNOYknTPtbfVDnqabmGsWkidpaSBGY0Q=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCIdLjvGks0QUU4ay-eO1jNQ",
//         createdAtCommunityTime: new Date("2025-03-16T22:32:37"),
//         parentId: null,
//         content:
//           "\u7f8e\u56fd\u7684\u8d38\u6613\u9006\u5dee\u662f\u7528\u7f8e\u5143\u7684\u5347\u964d\u5229\u606f\u6536\u5272\u5168\u7403\u7684\u5de5\u5177",
//         likeCount: 0,
//         actions: [],
//         isSubmitted: false,
//         crawlId: "dklr3kd1",
//       },
//       {
//         id: "UgyEHVQydQey7gqPhqp4AaABAg",
//         communityCommentId: "UgyEHVQydQey7gqPhqp4AaABAg",
//         postId: "kIo2BAubO6k",
//         authorName: "@chaucer6107",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_nlN2xoYhpqCLGuODUtZFd2X1dDAtiX7yqGpmzG2AFHCPQ=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCMtSjAmrR_JtIMD2bfTp0dw",
//         createdAtCommunityTime: new Date("2025-03-16T22:23:38"),
//         parentId: null,
//         content:
//           "\u8fd9\u4e48\u4e00\u770b\u52a0\u62ff\u5927\u8fd9\u4e2a\u56fd\u5bb6\u771f\u662f\u592a\u70c2\u4e86",
//         likeCount: 0,
//         actions: [],
//         isSubmitted: false,
//         crawlId: "dklr3kd1",
//       },
//       {
//         id: "UgwD1itxWgL71aFPvJl4AaABAg",
//         communityCommentId: "UgwD1itxWgL71aFPvJl4AaABAg",
//         postId: "kIo2BAubO6k",
//         authorName: "@sngnhbbxhh4834",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/98pmqi8RsJbkmrwDVfIkeQnmLHizhocLffiP4bnY82VC_40pECgM2PuxruCUhvfvjVqUPW7j=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCSZdGBfnjHM1DxcWj9juwpg",
//         createdAtCommunityTime: new Date("2025-03-16T21:03:49"),
//         parentId: null,
//         content:
//           "\u4ee5\u540e\u6240\u6709\u8d35\u65cf\u7684\u5b69\u5b50\u5fc5\u987b\u81ea\u8d39\u5230 \u56db\u5ddd\u8230\u961f\u670d\u5f79\u4e94\u5e74 \ud83d\ude02\u2764\u2764\u2764\u61c2\u5417 \u81ea\u8d39\u54c8 \u5426\u5219 \u5f53\u53bf\u957f\u90fd\u6ca1\u8d44\u683c\u54e6\ud83d\ude02\u2764\u2764\u2764\ud83c\udf89\ud83c\udf89\ud83c\udf89\ud83c\udf89\u4f60\u4fe1\u4e0d\u4fe1\u5462",
//         likeCount: 0,
//         actions: [],
//         isSubmitted: false,
//         crawlId: "dklr3kd1",
//       },
//       {
//         id: "Ugyf8MS6zHCLl9WJpE14AaABAg",
//         communityCommentId: "Ugyf8MS6zHCLl9WJpE14AaABAg",
//         postId: "kIo2BAubO6k",
//         authorName: "@nieniedaily8389",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_kos2EsvyYZaZW_JMZfCI3Ozehw6S_6CBTtbAu_LQjZIbc=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCmJhFaqaCDkbLMWosgnuicg",
//         createdAtCommunityTime: new Date("2025-03-16T20:46:11"),
//         parentId: null,
//         content:
//           "\u4e2d\u4e1c\u597d\u50cf\u62c6\u8fc1\u6237 \u7a81\u7136\u70b8\u5bcc\u9700\u8981\u4fdd\u6301\u3002\u65b0\u52a0\u5761\u9999\u6e2f\u662f\u7cbe\u82f1\u9636\u7ea7 \u9700\u8981\u4e00\u6b65\u4e00\u4e2a\u811a\u5370\u79ef\u7d2f\u8d22\u5bcc \u7ef4\u6301\u4e16\u4e16\u4ee3\u4ee3\u4e2d\u4ea7",
//         likeCount: 0,
//         actions: [],
//         isSubmitted: false,
//         crawlId: "dklr3kd1",
//       },
//       {
//         id: "UgwjsWckDyEThvBjVXZ4AaABAg",
//         communityCommentId: "UgwjsWckDyEThvBjVXZ4AaABAg",
//         postId: "kIo2BAubO6k",
//         authorName: "@JocelineChen-th9lc",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_nkHMdD8-iph0EM_9XXOHFTX5yr1_08Pyl5RsRmTC8NcKJnWauEhfigEgk72JRwumN-OA=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCGzeL4TYUEwRLBh1sjJ4tlw",
//         createdAtCommunityTime: new Date("2025-03-16T19:01:12"),
//         parentId: null,
//         content:
//           "\u592a\u68d2\u4e86\uff0c\u6bcf\u6b21\u770b\uff0c\u6bcf\u6b21\u8b9a\u5606\uff01\u8acb\u554f\u53e6\u4e00\u96c6\u53eb\u4ec0\u4e48\uff1f\u6211\u5f88\u6709\u8208\u8da3\u641c\u5c0b\u4f86\u770b. \u8b1d\u8b1d \ud83d\ude4f",
//         likeCount: 0,
//         actions: [
//           { type: "Like", desc: "" },
//           { type: "Reply", desc: "hoho haha hehe" },
//         ],
//         isSubmitted: true,
//         crawlId: "dklr3kd1",
//       },
//       {
//         id: "UgxMi2x3bE5nYPoYmBZ4AaABAg",
//         communityCommentId: "UgxMi2x3bE5nYPoYmBZ4AaABAg",
//         postId: "kIo2BAubO6k",
//         authorName: "@xuanye9259",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_msyD8C7MoBSBF9QRk0UbPWb3XCdFWb1eT0casFmL0=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCD20bz7LIcp_YQXi4DpKyKA",
//         createdAtCommunityTime: new Date("2025-03-16T18:57:42"),
//         parentId: null,
//         content:
//           "\u7b2c\u4e00\u540d\u900f\u660e \u4eba\u6c11\u62e5\u6709 \u7b2c\u4e8c\u540d \u7b2c\u4e09\u540d\u4e0d\u900f\u660e \u4f1f\u5927\u7684\u515a\u62e5\u6709 \u55ef\u55ef\u55ef \u6ca1\u6bdb\u75c5 \u4e00\u70b9\u6bdb\u75c5\u6ca1\u6709",
//         likeCount: 0,
//         actions: [],
//         isSubmitted: false,
//         crawlId: "dklr3kd1",
//       },
//     ],
//   },
//   {
//     post: {
//       postId: "KosgUhdAL5w",
//       postTitle: "聊聊我是怎么赚钱的 | 我们的团队",
//       postLink: "https://www.youtube.com/watch?v=KosgUhdAL5w",
//       postThumbnailUrl: s3_path + "/crabcrabgo_test/KosgUhdAL5w.jpg",
//       postSummary:
//         "你好奇吗？我是怎么赚钱的？ 我们的团队是怎么运作的？ 今天就来聊聊这个话题~",
//       postCreatedAtCommunityTime: new Date("2025-03-14T14:42:27"),
//       postLastCommentTime: new Date("2025-03-14T14:42:27"),
//       postLastCrawledTime: new Date("2025-03-14T14:42:27"),
//       channelId: "xiao_lin_shuo",
//       channelTitle: "小Lin说",
//       channelLink: "https://www.youtube.com/@xiao_lin_shuo",
//       channelThumbnailUrl: s3_path + "/crabcrabgo_test/xiao_lin_shuo.jpg",
//     },
//     crawl: null,
//     commentsWithActions: [],
//   },
//   {
//     post: {
//       postId: "31FpW6CMmYE",
//       postTitle: "全球最有钱的政府们是怎么投资的？",
//       postLink: "https://www.youtube.com/watch?v=31FpW6CMmYE",
//       postThumbnailUrl: s3_path + "/crabcrabgo_test/31FpW6CMmYE.jpg",
//       postSummary:
//         "朋友们，咱们今天来深度颇析一下，全世界最有钱的一些政府，它们是怎么管理自己的钱袋子的。全球十大主权基金，它们都是哪来的那么多钱？各自是怎么管理这动辄几千亿、上万亿美元的财富的？背后又有什么投资逻辑~",
//       postCreatedAtCommunityTime: new Date("2025-03-14T14:42:27"),
//       postLastCommentTime: new Date("2025-03-14T14:42:27"),
//       postLastCrawledTime: new Date("2025-03-14T14:42:27"),
//       channelId: "xiao_lin_shuo",
//       channelTitle: "小Lin说",
//       channelLink: "https://www.youtube.com/@xiao_lin_shuo",
//       channelThumbnailUrl: s3_path + "/crabcrabgo_test/xiao_lin_shuo.jpg",
//     },
//     crawl: {
//       crawlId: "dklr3kd3",
//       crawlTime: new Date("2025-03-14T10:00:00"),
//     },
//     commentsWithActions: [
//       {
//         id: "UgxDmdskQHcT8XKssvB4AaABAg",
//         communityCommentId: "UgxDmdskQHcT8XKssvB4AaABAg",
//         postId: "31FpW6CMmYE",
//         authorName: "@辛笑然",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_k4WYGDdUJi37sMDbG5QbNNNgC2DDiO8vkVii-UvFQ=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCyXqp6vDtxy-OM9wp2PrjOA",
//         createdAtCommunityTime: new Date("2025-03-16T02:44:39"),
//         parentId: null,
//         content:
//           "14\u5206\u949f\u7684\u54ea\u4e2a\u5e7f\u544a\u7b11\u6b7b\u6211\u4e86\u3002\u4eff\u4f5b\u518d\u8bf4\uff0c\u7f3a\u94b1\u627e\u6211\u3002\u6211\u4eba\u50bb\u94b1\u591a\u3002",
//         likeCount: 0,
//         actions: [
//           { type: "Like", desc: "" },
//           { type: "Reply", desc: "hoho haha hehe" },
//         ],
//         isSubmitted: false,
//         crawlId: "dklr3kd3",
//       },
//       {
//         id: "UgxcvhhAJjUmVL0AJP14AaABAg",
//         communityCommentId: "UgxcvhhAJjUmVL0AJP14AaABAg",
//         postId: "31FpW6CMmYE",
//         authorName: "@adrianloo177",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_ncKk8WXBtchU6r2_qkbQJu-lLK--rVV57eqSMsLdo=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCiG4BEnHdqMqx5iN5I6z6Ew",
//         createdAtCommunityTime: new Date("2025-03-16T02:04:49"),
//         parentId: null,
//         content:
//           "\u6bcf\u6b21\u6211\u90fd\u8981slow down speed\u3002\u4e0d\u7136\u592a\u5feb\u4e86 \u54c8\u54c8",
//         likeCount: 0,
//         actions: [{ type: "Delete", desc: "" }],
//         isSubmitted: true,
//         crawlId: "dklr3kd3",
//       },
//       {
//         id: "UgygOCHIF8Au6lcKAeV4AaABAg",
//         communityCommentId: "UgygOCHIF8Au6lcKAeV4AaABAg",
//         postId: "31FpW6CMmYE",
//         authorName: "@tonybox4496",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_kacat3SRmOWTo1jumRAh8P4sKTb9_55MgYUAfJHhA=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCv3ihjYBter97bopbziAJ9Q",
//         createdAtCommunityTime: new Date("2025-03-15T22:37:09"),
//         parentId: null,
//         content:
//           "\u9999\u6e2f\u9019\u9ebc\u53b2\u5bb3, \u53ef\u4ee5\u5728\u5730\u7403\u4e0a\u8e8b\u8eab\u8207\u77f3\u6cb9\u5927\u4f6c\u4e00\u9f4a\u73a9~",
//         likeCount: 0,
//         actions: [],
//         isSubmitted: false,
//         crawlId: "dklr3kd3",
//       },
//       {
//         id: "UgwkRf0Ft9Ss6494O8d4AaABAg",
//         communityCommentId: "UgwkRf0Ft9Ss6494O8d4AaABAg",
//         postId: "31FpW6CMmYE",
//         authorName: "@168kinon",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_nCK9jD0HzAh3qvY6ed8p_OLtjD5BtgU_edetyO8nY=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCz0jRwu8Z71UstIhNqwrAUw",
//         createdAtCommunityTime: new Date("2025-03-15T16:38:38"),
//         parentId: null,
//         content: "\u9aee\u578b\u5514\u540c\u5497\u8b8a\u5f97\u66f4\u6f02\u4eae",
//         likeCount: 0,
//         actions: [
//           { type: "Like", desc: "" },
//           { type: "Reply", desc: "hoho haha hehe" },
//         ],
//         isSubmitted: false,
//         crawlId: "dklr3kd3",
//       },
//       {
//         id: "Ugzg3PuNfN7IyHivxnh4AaABAg",
//         communityCommentId: "Ugzg3PuNfN7IyHivxnh4AaABAg",
//         postId: "31FpW6CMmYE",
//         authorName: "@jenfiez",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_k91ZkT10mV_HfsZASEDYxLFPd5S4L9vg0rIe0t2AU-lw=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UC_MM_WWmMoBgIoSSCpSLT-g",
//         createdAtCommunityTime: new Date("2025-03-15T16:28:31"),
//         parentId: null,
//         content:
//           '<a href="https://www.youtube.com/watch?v=31FpW6CMmYE&amp;t=296">4:56</a> HKD, not \u201cHDK\u201d.',
//         likeCount: 0,
//         actions: [],
//         isSubmitted: false,
//         crawlId: "dklr3kd3",
//       },
//       {
//         id: "Ugy3hCxwvokLsABxGJN4AaABAg",
//         communityCommentId: "Ugy3hCxwvokLsABxGJN4AaABAg",
//         postId: "31FpW6CMmYE",
//         authorName: "@fuugotiong7950",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_nbu4MS9YR1m9yWQK5Ua-c7NUpL49cw4OztVkLi8rRUx10=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCfcUdKo-mrDvhSLaUTAsXPQ",
//         createdAtCommunityTime: new Date("2025-03-15T07:58:49"),
//         parentId: null,
//         content:
//           "\u7f8e\u56fd\u7684\u94b1\u662f\u80cc\u540e\u8d22\u9600\u7684\uff0c\u4e0d\u662f\u7f8e\u56fd\u7684\u3002",
//         likeCount: 0,
//         actions: [{ type: "Reply", desc: "Reply reply hahaha" }],
//         isSubmitted: false,
//         crawlId: "dklr3kd",
//       },
//       {
//         id: "UgzD4kaNDX5Fra3Ouet4AaABAg",
//         communityCommentId: "UgzD4kaNDX5Fra3Ouet4AaABAg",
//         postId: "31FpW6CMmYE",
//         authorName: "@kakkouii456",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_kkiw0k1B4wAYT7dM8DSA4PXcPIVQPXcLu0Kf6UgoU=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCuiqTO_IctHkJ2mLFKcg9-A",
//         createdAtCommunityTime: new Date("2025-03-15T04:47:27"),
//         parentId: null,
//         content:
//           "\u592a\u7a81\u7136\u4e86\u5427  \u65b0\u5f71\u7247\u9084\u6c92\u770b\u5b8c\u5c31\u4e0d\u898b\u4e86\ud83d\ude05",
//         likeCount: 0,
//         actions: [{ type: "Delete", desc: "" }],
//         isSubmitted: false,
//         crawlId: "dklr3kd3",
//       },
//       {
//         id: "Ugxnae0CFnk5ZRkcEYR4AaABAg",
//         communityCommentId: "Ugxnae0CFnk5ZRkcEYR4AaABAg",
//         postId: "31FpW6CMmYE",
//         authorName: "@lcps666333222",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_lHFjBjdG57WBeGtWKPf9LRtdI9jCTlODIoQCdhQb32F6k=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCmlwhI453b72Oo9_aTdtu2g",
//         createdAtCommunityTime: new Date("2025-03-15T04:44:59"),
//         parentId: null,
//         content: "\u76f4\u63a5\u4e0b\u67b6\u662f\u600e\u6a23\uff1f",
//         likeCount: 0,
//         actions: [
//           { type: "Like", desc: "" },
//           { type: "Reply", desc: "hoho haha hehe" },
//         ],
//         isSubmitted: false,
//         crawlId: "dklr3kd3",
//       },
//     ],
//   },
//   {
//     post: {
//       postId: "4hBpLHqBSOg",
//       postTitle: "一口气了解12万亿化债和中国的财政体系",
//       postLink: "https://www.youtube.com/watch?v=4hBpLHqBSOg",
//       postThumbnailUrl: s3_path + "/crabcrabgo_test/4hBpLHqBSOg.jpg",
//       postSummary:
//         "你好奇吗？中国的财政体系是怎么样的？ 12万亿化债又是怎么回事？ 今天就来聊聊这个话题~",
//       postCreatedAtCommunityTime: new Date("2025-03-14T14:42:27"),
//       postLastCommentTime: new Date("2025-03-14T14:42:27"),
//       postLastCrawledTime: new Date("2025-03-14T14:42:27"),
//       channelId: "xiao_lin_shuo",
//       channelTitle: "小Lin说",
//       channelLink: "https://www.youtube.com/@xiao_lin_shuo",
//       channelThumbnailUrl: s3_path + "/crabcrabgo_test/xiao_lin_shuo.jpg",
//     },
//     crawl: {
//       crawlId: "dklr3kd4",
//       crawlTime: new Date("2025-03-14T10:00:00"),
//     },
//     commentsWithActions: [
//       {
//         id: "UgxcMypX_OJQDFLxgHF4AaABAg",
//         communityCommentId: "UgxcMypX_OJQDFLxgHF4AaABAg",
//         postId: "4hBpLHqBSOg",
//         authorName: "@小其-d2z",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_lCzOywUC6yzXpXKG90b-k1x7mJLmj-deYQwRhJmxaYECPZMNtZxESF3NhTg8ZDS468R1AyJDgS=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UC39hN2xl4C-aPQTrV3YKBxA",
//         createdAtCommunityTime: new Date("2025-03-15T09:03:24"),
//         parentId: null,
//         content: "\u83e0\u83dc<br>\u767e\u5343\u4e07.\u897f\u54e6\u4e48",
//         likeCount: 0,
//         actions: [],
//         isSubmitted: false,
//         crawlId: "dklr3kd4",
//       },
//       {
//         id: "UgwQCD0Jh6FaFqj-k-J4AaABAg",
//         communityCommentId: "UgwQCD0Jh6FaFqj-k-J4AaABAg",
//         postId: "4hBpLHqBSOg",
//         authorName: "@morinson-l2o",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_kca4zzSa19srlRdWdaz9q9pwaIGyPYqmyE-ZvehQJr9YL_GufA3vS1TxtgqBQFVeLJKA=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCvFl9G7xe5QSWsaMpZ9EZ-g",
//         createdAtCommunityTime: new Date("2025-03-13T13:09:48"),
//         parentId: null,
//         content:
//           "\u5c0f\u6797\u662f\u628a\u80fd\u8bf4\u7684\u90fd\u8bf4\u4e86\uff0c\u4e0d\u80fd\u8bf4\u7684\u4e00\u70b9\u4e5f\u6ca1\u8bf4\ud83d\ude02\ud83d\ude02\ud83d\ude02",
//         likeCount: 2,
//         actions: [],
//         isSubmitted: false,
//         crawlId: "dklr3kd4",
//       },
//       {
//         id: "UgwLx-FF3MJbPpLxg3p4AaABAg",
//         communityCommentId: "UgwLx-FF3MJbPpLxg3p4AaABAg",
//         postId: "4hBpLHqBSOg",
//         authorName: "@1004코인",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ASIxp4ewdN4-IldNCHEMj9f-e2ckgs-hqvqvGTb6AY7AW1-UvEBA4Hm-JWZWykJZOV3xlbOI=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UChI5vAALErJLdcYFZO11nIA",
//         createdAtCommunityTime: new Date("2025-03-13T12:10:48"),
//         parentId: null,
//         content:
//           'x\u4e0b\u4e00\u6b65\u5927\u5bb6\u9700\u8981\u8bb0\u4f4f~\u4e0d\u7ba1\u662f\u4ec0\u4e48\u503a\u52a1\u9700\u8981\u6709\u4eba\u5206\u62c5\u3002\u91cd\u70b9\u53ea\u8bb2\u4e00\u6b21<a href="UCkszU2WH9gy1mb0dV-11UJg/ygF1XpGUMMjk8gSDrI2wCx"></a>',
//         likeCount: 0,
//         actions: [{ type: "Delete", desc: "" }],
//         isSubmitted: false,
//         crawlId: "dklr3kd4",
//       },
//       {
//         id: "UgzJXmozKeiGEXyhjUF4AaABAg",
//         communityCommentId: "UgzJXmozKeiGEXyhjUF4AaABAg",
//         postId: "4hBpLHqBSOg",
//         authorName: "@yealye",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/Ey-9Ikwy7mRBgEo4dCpU93ecIS0-hmY1od6NWr4OxsJ5vqInv28_rAiHlaI5jwO7IMaOdPZNNw=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCx-tRvCvnCOcqXNiWyzYU8w",
//         createdAtCommunityTime: new Date("2025-03-13T06:40:32"),
//         parentId: null,
//         content:
//           "\u89c6\u9891\u662f\u4e0d\u662f\u5220\u51cf\u4e86\u4e00\u90e8\u5206\uff0c\u8bb0\u5f97\u4e00\u5f00\u59cb\u770b\u597d\u50cf\u670930\u591a\u5206\u949f",
//         likeCount: 0,
//         actions: [
//           { type: "Dislike", desc: "" },
//           { type: "Reply", desc: "hoho haha hehe" },
//         ],
//         isSubmitted: false,
//         crawlId: "dklr3kd4",
//       },
//       {
//         id: "UgyiiATb7l0Fhm6Str54AaABAg",
//         communityCommentId: "UgyiiATb7l0Fhm6Str54AaABAg",
//         postId: "4hBpLHqBSOg",
//         authorName: "@dongguaz6200",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_nflxGpzDPFpKZujNOaUL14p-_Ft2IAttEqzFME8z4kSg=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCaMenTvvDFX4KZykobLkxSQ",
//         createdAtCommunityTime: new Date("2025-03-12T12:43:30"),
//         parentId: null,
//         content: "12\uff0c\u4e00\u770b\u5c31\u662f\u80e1\u8bf4\u516b\u9053",
//         likeCount: 0,
//         actions: [{ type: "Reply", desc: "Reply reply hahaha" }],
//         isSubmitted: false,
//         crawlId: "dklr3kd4",
//       },
//       {
//         id: "UgwtmqRErZjOtD-Z9td4AaABAg",
//         communityCommentId: "UgwtmqRErZjOtD-Z9td4AaABAg",
//         postId: "4hBpLHqBSOg",
//         authorName: "@vanessawei7336",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/hc8Qmct86kuEx4Xw0XjFhD3O1QgMIxEUyf3UM5JgCQrtJ_hjRKYD8IzMnUFXebPpVpBdNybU=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UC2bmKr_nYsPjuI3A44HCcmQ",
//         createdAtCommunityTime: new Date("2025-03-11T23:49:45"),
//         parentId: null,
//         content:
//           "\u4e2d\u56fd\u7684\u589e\u503c\u7a0e\u7c7b\u4f3c\u4e8e\u52a0\u62ff\u5927\u548c\u7f8e\u56fd\u7684\u6d88\u8d39\u7a0e\uff0c\u8fd9\u4e2a\u7a0e\u65e2\u6709\u4f01\u4e1a\u4ea4\u7684\uff0c\u4e5f\u6709\u4e2a\u4eba\u4ea4\u7684\uff0c\u662f\u4e00\u79cd\u6d41\u8f6c\u7a0e\uff0c\u4e2d\u95f4\u6d88\u8d39\u8005\uff08\u4e3b\u8981\u662f\u4f01\u4e1a\uff09\u662f\u53ef\u4ee5\u62b5\u6263\u7684\uff0c\u57fa\u672c\u843d\u5728\u6700\u7ec8\u6d88\u8d39\u8005\u8eab\u4e0a",
//         likeCount: 0,
//         actions: [
//           { type: "Like", desc: "" },
//           { type: "Reply", desc: "hoho haha hehe" },
//         ],
//         isSubmitted: false,
//         crawlId: "dklr3kd4",
//       },
//       {
//         id: "UgyrCRtdzPIzKK0wZKR4AaABAg",
//         communityCommentId: "UgyrCRtdzPIzKK0wZKR4AaABAg",
//         postId: "4hBpLHqBSOg",
//         authorName: "@hahnnienl9509",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_k0brn8nfCP0SFfDLClYU3s2NGbKJhmvqltZaV1MsQ=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCHpNPWXhPN-5P8fKvQpjCWg",
//         createdAtCommunityTime: new Date("2025-03-08T08:03:30"),
//         parentId: null,
//         content:
//           "\u5c0fLin\uff0c\u53ef\u4ee5\u8bb2\u8bb2\u5fb7\u56fd\u65b0\u603b\u7406\u65b0\u9881\u5e03\u7684\u8d22\u653f\u653f\u7b56\u7684\u5229\u5f0a\u5417",
//         likeCount: 0,
//         actions: [],
//         isSubmitted: false,
//         crawlId: "dklr3kd4",
//       },
//       {
//         id: "UgzBAvIrVaucqWKIgmN4AaABAg",
//         communityCommentId: "UgzBAvIrVaucqWKIgmN4AaABAg",
//         postId: "4hBpLHqBSOg",
//         authorName: "@chensensen-w4s",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_lChINaMGzuGgYEdxh2b3CDLHVRP0vOCNdungwimTXwMXnLgD61gOFh7OyoNaPYCYhBMA=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCqGNjQYi8NIWlJiAH5Xoeaw",
//         createdAtCommunityTime: new Date("2025-03-06T02:32:28"),
//         parentId: null,
//         content:
//           "\u5c0flin\u8b1b\u8ff0\u6e05\u6670\u5e7d\u9ed8\uff0c\u81ea\u88fd\u8868\u60c5\u5305\u4e5f\u5f88\u70d8\u6258\u5fc3\u60c5\uff0c\u535a\u5f97\u5927\u5bb6\u6703\u5fc3\u4e00\u7b11",
//         likeCount: 0,
//         actions: [],
//         isSubmitted: false,
//         crawlId: "dklr3kd4",
//       },
//       {
//         id: "UgzhREjUnzEHXNqhMJt4AaABAg",
//         communityCommentId: "UgzhREjUnzEHXNqhMJt4AaABAg",
//         postId: "4hBpLHqBSOg",
//         authorName: "@圣上侯",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/JYMFtCYWayeQADU4sjTzF1w4p3O8m0awfpQWzeFu0nl7REf09yts6ykYOi0cSnJrgah-s4pqJak=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UCjydlHrEfV8uYZhjftK2SOA",
//         createdAtCommunityTime: new Date("2025-03-05T13:52:54"),
//         parentId: null,
//         content:
//           "\u5e94\u8be5\u8bb2\u771f\u5b9e  \u53ca\u539f\u56e0   \u89e3\u51b3\u63aa\u65bd",
//         likeCount: 0,
//         actions: [],
//         isSubmitted: false,
//         crawlId: "dklr3kd4",
//       },
//       {
//         id: "UgwcttbkqLeH1I81E5J4AaABAg",
//         communityCommentId: "UgwcttbkqLeH1I81E5J4AaABAg",
//         postId: "4hBpLHqBSOg",
//         authorName: "@壮壮志在我胸",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/ytc/AIdro_kS8xvy4VbGSNhuEbnBXa9RkFW-8_E_KIlGpljLkiE=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UC-x-gHZiLuUFQ2qFvAvygYQ",
//         createdAtCommunityTime: new Date("2025-03-05T04:30:33"),
//         parentId: null,
//         content:
//           "\u4e2a\u4eba\u6240\u5f97\u7a0e\u5c11\u8bf4\u660e\u56fd\u4eba\u6536\u5165\u5f88\u4f4e\u554a",
//         likeCount: 0,
//         actions: [{ type: "Delete", desc: "" }],
//         isSubmitted: false,
//         crawlId: "dklr3kd4",
//       },
//     ],
//   },
//   {
//     post: {
//       postId: "oZozNrtbg-o",
//       postTitle:
//         "Block Diffusion: Interpolating Between Autoregressive and Diffusion Language Models (ICLR 2025)",
//       postLink: "https://www.youtube.com/watch?v=oZozNrtbg-o",
//       postThumbnailUrl: s3_path + "/crabcrabgo_test/oZozNrtbg-o.jpg",
//       postSummary:
//         "This study introduces Block Diffusion Language Models (BD3-LMs), which blend discrete diffusion with autoregressive methods. Unlike traditional diffusion models that are fixed-length and computationally heavy, BD3-LMs support flexible-length text generation and improve inference efficiency using KV caching and parallel token sampling. BD3-LMs generate sequences up to 10 times longer than previous discrete diffusion models while maintaining improved perplexity scores—achieving 28.23 PPL compared to 31.78 PPL for earlier approaches.",
//       postCreatedAtCommunityTime: new Date("2025-03-14T14:42:27"),
//       postLastCommentTime: new Date("2025-03-14T14:42:27"),
//       postLastCrawledTime: new Date("2025-03-14T14:42:27"),
//       channelId: "RibbitRibbit365",
//       channelTitle: "Ribbit Ribbit",
//       channelLink: "https://www.youtube.com/@RibbitRibbit365",
//       channelThumbnailUrl: s3_path + "/crabcrabgo_test/RibbitRibbit365.jpg",
//     },
//     crawl: {
//       crawlId: "dklr3kd5",
//       crawlTime: new Date("2025-03-14T10:00:00"),
//     },
//     commentsWithActions: [
//       {
//         id: "UgzRTUxcvQRWl_y7zjh4AaABAg",
//         communityCommentId: "UgzRTUxcvQRWl_y7zjh4AaABAg",
//         postId: "oZozNrtbg-o",
//         authorName: "@RibbitRibbit365",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/JuX9VuwKw7oeAXdO98F8fapcdxBiZokO0D6txeG5NqyFGCW5ZrZsLfGxDMjR7L9G15BaF_leiA=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UC-NS7FrbfHbFcOsp2NPaQRg",
//         createdAtCommunityTime: new Date("2025-03-13T23:55:24"),
//         parentId: null,
//         content:
//           'Check out our brand-new \u201cSplash Board\u201d <a href="https://ribbitribbit.co/board">https://RibbitRibbit.co/board</a> to see which papers are making waves this month! Love a paper\ud83d\udc9a? Vote for it now \u2b06. Once it reaches 10 votes, we\u2019ll hop right into a deep dive for you! \ud83d\udc20',
//         likeCount: 0,
//         actions: [],
//         isSubmitted: false,
//         crawlId: "dklr3kd5",
//       },
//     ],
//   },
//   {
//     post: {
//       postId: "6SDtf0M3fRo",
//       postTitle: "Transformers without Normalization (Paper Walkthrough)",
//       postLink: "https://www.youtube.com/watch?v=6SDtf0M3fRo",
//       postThumbnailUrl: s3_path + "/crabcrabgo_test/6SDtf0M3fRo.jpg",
//       postSummary:
//         "Transformers can work without normalization by using Dynamic Tanh (DyT), an element-wise operation that mimics LayerNorm’s tanh-like behavior. DyT removes the need for normalization while matching or improving performance—boosting Vision Transformer accuracy by up to 0.5% on ImageNet with no hyperparameter tuning.",
//       postCreatedAtCommunityTime: new Date("2025-03-14T14:42:27"),
//       postLastCommentTime: new Date("2025-03-14T14:42:27"),
//       postLastCrawledTime: new Date("2025-03-14T14:42:27"),
//       channelId: "RibbitRibbit365",
//       channelTitle: "Ribbit Ribbit",
//       channelLink: "https://www.youtube.com/@RibbitRibbit365",
//       channelThumbnailUrl: s3_path + "/crabcrabgo_test/RibbitRibbit365.jpg",
//     },
//     crawl: {
//       crawlId: "dklr3kd6",
//       crawlTime: new Date("2025-03-14T10:00:00"),
//     },
//     commentsWithActions: [
//       {
//         id: "UgxvIoovMliaJkCUaHN4AaABAg",
//         communityCommentId: "UgxvIoovMliaJkCUaHN4AaABAg",
//         postId: "6SDtf0M3fRo",
//         authorName: "@RibbitRibbit365",
//         authorThumbnailUrl:
//           "https://yt3.ggpht.com/JuX9VuwKw7oeAXdO98F8fapcdxBiZokO0D6txeG5NqyFGCW5ZrZsLfGxDMjR7L9G15BaF_leiA=s48-c-k-c0x00ffffff-no-rj",
//         authorCommunityId: "UC-NS7FrbfHbFcOsp2NPaQRg",
//         createdAtCommunityTime: new Date("2025-03-15T05:09:42"),
//         parentId: null,
//         content:
//           'Check out our brand-new \u201cSplash Board\u201d <a href="https://ribbitribbit.co/board">https://RibbitRibbit.co/board</a> to see which papers are making waves this month! Love a paper\ud83d\udc9a? Vote for it now \u2b06. Once it reaches 10 votes, we\u2019ll hop right into a deep dive for you! \ud83d\udc20',
//         likeCount: 0,
//         actions: [{ type: "Reply", desc: "Reply reply hahaha" }],
//         isSubmitted: false,
//         crawlId: "dklr3kd6",
//       },
//     ],
//   },
// ];
