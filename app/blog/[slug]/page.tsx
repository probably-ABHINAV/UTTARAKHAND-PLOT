import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"
import { Calendar, Clock, Eye, User, ArrowLeft, Share2, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// Blog posts data (same as admin section)
const blogPosts = [
  {
    id: 1,
    title: "Land Near Highways: Buy Today, Profit Tomorrow!",
    slug: "Land-Near-Highways-Buy-Today-Profit-Tomorrow!",
    excerpt:
      "Introduction",
    content: `
      <p>Real estate investment in India is no longer just about buying a home-it has become a long-term source of financial security. Especially when it comes to land located near highways, investors see it as a golden opportunity. The reasons are clear: better connectivity, rapid development, and strong price appreciation in the future. In this article, we’ll explore in detail why investing in land near highways is a smart and safe decision.</p>
      
      <h2>1. Locations That Invite Development</h2>
      <p>Land near highways is always well-connected to transport and infrastructure. Areas along national and state highways develop quickly because both the government and private companies prioritize such locations. Shopping complexes, hospitals, schools, and industrial parks emerge faster, pushing up property values.
Additionally, basic amenities like road lighting, drainage, water supply, and electricity infrastructure are developed swiftly in these regions, making them even more attractive. This is why highway-adjacent land has become a safe and profitable option for investors.</p>
     <h2>2. Returns Powered by Connectivity</h2>
      <p>Better connectivity is the biggest advantage of highway-connected areas. Such locations get access to roads, railways, and airports more quickly. This connectivity transforms the area into a hub in just a few years. The result? Land prices rise rapidly, offering great returns in a short span.
Furthermore, once connected to a highway, areas benefit from public transport, trucking routes, and logistics networks-boosting commercial activity. This leads to a spike in both demand and rates of properties.</p>
     
      <h2>3. Rapid Increase in Rental Demand</h2>
      <p>When an area gets connected to a highway, both residential and commercial activities expand. This directly increases rental demand. Land or homes you invest in start generating regular rental income.
In such locations, the demand for offices, warehouses, shops, and small flats surges. Hence, investors here don't just buy land-they secure a steady source of rental income. Some investors even build hostels or guesthouses on plots in these areas to earn a monthly income.</p>
     
      <h2>4. A Future-Proof Investment</h2>
      <p>The biggest advantage of investing in land near highways is the guarantee of development. Whether it’s a new bypass, industrial corridor, or smart city project-areas near highways are often at the center of development. As a result, such investments are protected from future economic fluctuations.
Sometimes, the government converts these regions into SEZs (Special Economic Zones) or smart towns, which causes property values to multiply. An investment made once continues to offer secure and growing returns for years to come.</p>
    
      <h2>5. Boost from Government Projects</h2>
      <p>Governments often launch smart city, industrial zone, and logistics park projects along highways. These projects significantly increase land value. Investors who buy land early benefit from low purchase prices and high returns.
Such government initiatives also enhance nearby infrastructure-like schools, colleges, hospitals, electricity, and water-making the area ideal for living and doing business. This ensures consistent appreciation in property value year after year.</p>
      
      <h2>Investment Tips</h2>
      <p>When investing in Uttrakhand hill stations, consider factors like accessibility, local regulations, environmental clearances, and seasonal variations in tourism. Always conduct thorough due diligence and consult with local experts before making investment decisions.</p>
    `,
    category: "Investment",
    tags: ["Investment", "Hill Stations", "Real Estate", "Tourism"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2025-10-24",
    lastModified: "2025-10-24",
    views: 1250,
    featured: true,
    metaTitle: "Best Investment Opportunities in Uttrakhand Hill Stations 2024",
    metaDescription:
      "Explore top investment opportunities in Uttrakhand's hill stations. Complete guide to real estate investment in Mussoorie, Nainital, and more.",
    image: "/images/E_1760471281368.jpg",
  },
  {
    id: 2,
    title: "Real Estate से पैसा कैसे कमाएं: पूरी रणनीति",
    slug: "spiritual-tourism-boom-rishikesh-properties",
    excerpt:
      "",
    content: `
      <h2>भूमिका:</h2>
      <p>रियल एस्टेट केवल एक घर या संपत्ति खरीदने और बेचने का जरिया नहीं है, बल्कि यह एक ऐसा क्षेत्र है जो आपको दीर्घकालिक वित्तीय स्वतंत्रता दिला सकता है। सही समय, सही जगह और समझदारी से लिया गया निर्णय आपको अच्छा रिटर्न और स्थिर आय दे सकता है। आइए विस्तार से जानते हैं कि कैसे आप रियल एस्टेट के विभिन्न तरीकों से पैसा कमा सकते हैं।</p>
      <h2>1. प्लॉट या जमीन में निवेश</h2>
      <p>प्लॉट में निवेश सबसे पारंपरिक और लाभकारी तरीका है रियल एस्टेट से पैसा कमाने का। जमीन एक ऐसी संपत्ति है जिसकी वैल्यू समय के साथ बढ़ती जाती है, खासकर जब वह जमीन किसी हाईवे, एयरपोर्ट, कॉलेज या इंडस्ट्रियल एरिया के नजदीक हो। ऐसी लोकेशन वाली जमीनें निवेशकों के लिए सोने की खान साबित होती हैं।</p>
      <p>इसमें मेंटेनेंस की चिंता नहीं होती और टैक्स भी सीमित रहता है। आप प्लॉट को कुछ वर्षों तक होल्ड करके ऊँचे दाम पर बेच सकते हैं या फिर उसे लीज पर देकर किराया कमा सकते हैं। प्लॉट पर फार्महाउस, वेयरहाउस या होमस्टे का निर्माण करके उससे और अधिक कमाई भी की जा सकती है। यदि आप कम जोखिम के साथ लंबी अवधि का फायदा चाहते हैं, तो प्लॉट में निवेश करना सबसे सरल और स्थिर विकल्प है।</p>
      <h2>2. किराये से कमाई (Rental Income)</h2>
      <p>किराये पर संपत्ति देकर नियमित मासिक आमदनी हासिल करना रियल एस्टेट से कमाई का एक बेहद प्रचलित तरीका है। एक बार आप प्रॉपर्टी खरीद लें और उसे अच्छे किरायेदार को दे दें, तो हर महीने एक निश्चित रकम आपके खाते में आती रहती है। यह आमदनी आपके अन्य खर्चों को कवर कर सकती है या फिर भविष्य के निवेशों के लिए बचत का माध्यम बन सकती है।</p>
      <p>मेट्रो सिटी, कॉलेज या ऑफिस एरिया के पास 1BHK, 2BHK फ्लैट, दुकान या ऑफिस किराये पर आसानी से चल जाते हैं। ऐसे क्षेत्रों में किराये की दरें अधिक होती हैं जिससे आपकी निवेश की राशि जल्द रिकवर हो जाती है। किराये की संपत्ति पर टैक्स बेनिफिट भी मिलते हैं और इसके साथ ही प्रॉपर्टी की कीमत भी बढ़ती रहती है।</p>
      <h2>3. प्री-लॉन्च प्रॉपर्टी में निवेश</h2>
      <p>डेवलपर्स कई बार अपने प्रोजेक्ट की शुरुआत में ही प्री-लॉन्च ऑफर देते हैं, जिसमें प्रॉपर्टी की कीमत बाजार रेट से कम होती है। ऐसे समय पर निवेश करने पर निवेशक को प्रोजेक्ट पूरा होने के बाद काफी अच्छा रिटर्न मिल सकता है। प्री-लॉन्च में खरीदी गई यूनिट को पजेशन के समय या उससे पहले ही बेचकर मुनाफा कमाया जा सकता है।</p>
      <p>इसमें फायदा यह होता है कि निवेश कम होता है और मुनाफा अधिक। हालांकि, इसमें जोखिम भी होता है क्योंकि प्रोजेक्ट समय पर पूरा होगा या नहीं, यह निश्चित नहीं होता। इसलिए, ऐसे निवेश से पहले डेवलपर की साख, रेरा अप्रूवल और प्रोजेक्ट डिटेल्स की अच्छे से जांच कर लेना जरूरी है। यदि सब कुछ सही हो, तो यह रणनीति बहुत कम समय में बेहतरीन रिटर्न दे सकती है।</p>
      <h2>4. कमर्शियल प्रॉपर्टी में निवेश</h2>
      <p>कमर्शियल प्रॉपर्टी जैसे दुकान, ऑफिस स्पेस, गोदाम या शोरूम में निवेश करने से अधिक रिटर्न की संभावना होती है। व्यापारिक गतिविधियां हमेशा बढ़ रही हैं और उन्हें स्पेस की ज़रूरत होती है। ऐसे में यदि आपने किसी हाई फुटफॉल वाले एरिया में कमर्शियल प्रॉपर्टी में निवेश किया है, तो आपको किराये से स्थायी और अच्छी आय प्राप्त हो सकती है।</p>
      <p>कमर्शियल यूनिट्स में रिटर्न रेसिडेंशियल यूनिट्स से कहीं अधिक होता है। यहां तक कि कई बड़े ब्रांड्स और कंपनियां लंबी अवधि के लिए ऐसी प्रॉपर्टीज लीज पर लेती हैं, जिससे आपकी आमदनी वर्षों तक स्थिर बनी रहती है। हालांकि इसकी शुरुआती लागत अधिक होती है, लेकिन मुनाफा भी उसी हिसाब से बड़ा होता है।</p>
      <h2>5. रियल एस्टेट रीसेलिंग से कमाई</h2>
      <p>अगर आपके पास मार्केट की समझ और थोड़ी तकनीकी जानकारी है तो आप पुरानी या सस्ती प्रॉपर्टी खरीदकर उसे रेनोवेट करके अच्छे दामों पर बेच सकते हैं। इस मॉडल को 'फ्लिपिंग' कहा जाता है। यह तरीका बहुत लोगों के लिए एक आकर्षक व्यवसाय बन गया है।</p>
      <p>एक फ्लैट जिसकी हालत खराब है, उसे पेंट, नया फर्नीचर, मॉड्यूलर किचन और अन्य सुधार करके उसकी कीमत में भारी इजाफा किया जा सकता है। इसमें ₹5 लाख के सुधार पर ₹10 से ₹15 लाख तक का मुनाफा मिलना संभव होता है। हालांकि यह एक एक्टिव इन्वेस्टमेंट मॉडल है जिसमें समय, मेहनत और पैसे की जरूरत होती है, लेकिन सही प्रॉपर्टी मिलने पर इसमें बड़ा फायदा उठाया जा सकता है।</p>
    `,
    category: "Market Trends",
    tags: ["Rishikesh", "Spiritual Tourism", "Property Demand", "Yoga"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2025-10-24",
    lastModified: "2025-10-24",
    views: 890,
    featured: false,
    metaTitle: "Rishikesh Property Investment: Spiritual Tourism Boom 2024",
    metaDescription:
      "Why Rishikesh properties are in high demand due to the spiritual tourism boom. Investment insights and market analysis.",
    image: "/images/design1.png",
  },
  {
    id: 3,
    title: "सही प्रॉपर्टी पहचानने के 5 दमदार तरीके – एक समझदार निवेशक बनने की गाइड",
    slug: "hill-station-property-market-trends-2024",
    excerpt: "आज की तेज़ रफ्तार ज़िंदगी में हर कोई अपने सपनों का घर चाहता है या फिर किसी ऐसी प्रॉपर्टी में निवेश करना चाहता है, जो भविष्य में बड़ा रिटर्न दे सके। लेकिन प्रॉपर्टी खरीदना एक आम लेन-देन नहीं होता। यह आपके जीवन की सबसे बड़ी खरीद में से एक होती है। इसलिए जरूरी है कि आप हर कदम सोच-समझकर उठाएं।",
    content: `
     <h2>लोकेशन – प्रॉपर्टी की जान होती है</h2>
     <p>अगर आप किसी प्रॉपर्टी की सही कीमत और उसका भविष्य जानना चाहते हैं, तो सबसे पहले उसकी लोकेशन पर ध्यान दें। कोई भी प्रॉपर्टी कितनी भी खूबसूरत क्यों न हो, अगर वह सही जगह पर नहीं है तो उसकी वैल्यू धीरे-धीरे कम हो सकती है। दूसरी ओर, एक साधारण सी प्रॉपर्टी भी अगर अच्छे एरिया में है तो उसकी कीमत समय के साथ दोगुनी-तिगुनी हो सकती है।</p>
     <p><strong>किन बातों पर ध्यान दें?</strong></p>
     <p>क्या प्रॉपर्टी शहर के अच्छे हिस्से में है?</p>
     <p>क्या उसके पास स्कूल, अस्पताल, मॉल, बस स्टैंड या मेट्रो स्टेशन है?</p>
     <p>क्या आने वाले वर्षों में उस इलाके में कोई बड़ा डेवलपमेंट हो रहा है? जैसे – हाइवे, रिंग रोड, एयरपोर्ट, या कोई इंडस्ट्रियल जोन?</p>
     <p><strong> मान लीजिए कि देहरादून में शिमला-रोड के पास एक प्रोजेक्ट है जहां नया हाइवे बन रहा है। ऐसे लोकेशन में निवेश करने से आने वाले 5–10 वर्षों में आपकी प्रॉपर्टी की कीमत में बंपर उछाल आ सकता है।</strong></p>
     <h2>लीगल डॉक्युमेंट्स और स्वामित्व की जांच – कहीं फंस न जाएं!</h2>
     <p>भारत में सबसे ज़्यादा प्रॉपर्टी विवाद तब होते हैं जब लोग बिना ठीक से डॉक्युमेंट्स चेक किए कोई ज़मीन या फ्लैट खरीद लेते हैं। इसलिए, यह ज़रूरी है कि आप हर एक कागज की जांच करें और यह पक्का करें कि प्रॉपर्टी वैध है।</p>
     <p><strong>कौन-कौन से डॉक्युमेंट्स देखने जरूरी हैं?</strong></p>
     <p>सेल डीड (Sale Deed): ये प्रमाणित करता है कि प्रॉपर्टी का मालिक कौन है।</p>
     <p>खसरा-खतौनी और जमाबंदी: ज़मीन की हिस्ट्री बताती है।</p>
     <p>एनओसी (No Objection Certificate): नगर निगम, बिजली, जल विभाग से अनुमति होनी चाहिए।</p>
     <p><strong>यदि कोई प्रॉपर्टी इन कागज़ात से लैस नहीं है, तो चाहे वह कितनी भी सस्ती क्यों न हो, खरीदने से बचना चाहिए।</strong></p>
     <h2> बिल्डर या डेवेलपर की साख – भरोसेमंद होना जरूरी है</h2>
     <p>प्रॉपर्टी सिर्फ ज़मीन नहीं होती – वो डेवेलपर के वादों और गुणवत्ता पर भी टिकी होती है। अगर बिल्डर ने समय पर प्रोजेक्ट डिलीवर नहीं किया, या निर्माण में घटिया सामग्री का प्रयोग किया, तो नुकसान आपका ही होगा।</p>
     <p><strong>किन बातों पर ध्यान दें?</strong></p>
     <p>बिल्डर का पुराना ट्रैक रिकॉर्ड: क्या उसने पहले प्रोजेक्ट टाइम पर डिलीवर किए हैं?</p>
     <p>ग्राहकों की राय: गूगल रिव्यू, फेसबुक, या यूट्यूब पर पुराने खरीदारों की प्रतिक्रिया देखें।</p>
     <p>प्रोजेक्ट का ऑन-साइट विज़िट: मॉडल फ्लैट और साइट पर जाकर खुद देखें कि क्या वादे और ज़मीनी हकीकत में फर्क है?</p>
     <p><strong>कई बार छोटे बिल्डर्स flashy brochure और भारी डिस्काउंट ऑफर करते हैं, लेकिन बाद में प्रोजेक्ट अटक जाता है या क्वालिटी बहुत खराब होती है।</strong></p>
     <h2>बजट और होम लोन प्लानिंग – जेब देख कर खर्च करें</h2>
     <p>प्रॉपर्टी खरीदते समय यह ज़रूरी है कि आप अपनी जेब को ध्यान में रखें। सिर्फ सुंदर फ्लैट देखकर फैसला करना समझदारी नहीं है। अक्सर लोग ईएमआई का बोझ उठाने के चक्कर में ज़िंदगी का संतुलन खो बैठते हैं।</p>
     <p><strong>कैसे करें फाइनेंस प्लान?</strong></p>
     <p>बजट तय करें: घर की लागत के साथ-साथ रजिस्ट्रेशन फीस, PLC, GST, और मेंटेनेंस चार्ज को जोड़कर कुल लागत का अनुमान लगाएं।</p>
     <p>बैंक से प्री-अप्रूव्ड लोन लें: इससे पता चलेगा कि आप कितना लोन ले सकते हैं और किस रेंज की प्रॉपर्टी देखनी है।</p>
     <p>ईएमआई की कैलकुलेशन करें: आपकी सैलरी का 40% से ज्यादा EMI में नहीं जाना चाहिए।</p>
     <p><strong>निवेश करते समय थोड़ा लचीलापन रखें ताकि आप जरूरत पड़ने पर जल्दी बेच भी सकें और कैश निकाल सकें।</strong></p>
     <h2>लिवेबिलिटी और फ्यूचर वैल्यू – सिर्फ आज नहीं, कल भी सोचें</h2>
     <p>कोई भी प्रॉपर्टी सिर्फ bricks और cement नहीं होती, उसमें जिंदगी होती है। इसलिए जरूरी है कि वह जगह सिर्फ रहने लायक हो, बल्कि भविष्य में भी उसकी मांग बनी रहे।</p>
     <p><strong>किन बातों पर ध्यान दें?</strong></p>
     <p>आस-पास की सुविधाएं: क्या वहां स्कूल, हॉस्पिटल, मार्केट, ATM, पार्क आदि हैं?</p>
     <p>सुरक्षा और समाजिक माहौल: रात में सड़कें सुनसान तो नहीं रहती? आसपास का माहौल कैसा है?</p>
     <p>डेवलपमेंट प्लान: क्या नगर निगम या सरकार वहां पर आने वाले 5 सालों में कोई नई योजना ला रही है?</p>
     <p><strong>ग्रेटर देहरादून, नॉएडा एक्सटेंशन जैसे नए डेवलपिंग लोकेशन्स में आज भले ही कीमत कम हो, लेकिन 5 साल में वहां की डिमांड आसमान छू सकती है।</strong></p>
    `,
    category: "Market Analysis",
    tags: ["Market Trends", "2024 Predictions", "Hill Stations", "Property Market"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2025-10-24",
    lastModified: "2025-10-24",
    views: 645,
    featured: false,
    metaTitle: "Hill Station Property Market Trends & Predictions 2024",
    metaDescription:
      "Complete analysis of hill station property market trends in Uttrakhand. Expert predictions and investment insights for 2024.",
    image: "/images/friends-colony-phase1.jpg",
  },
  {
    id: 4,
    title: "Why Buying a Plot Is Better Than Buying a Flat in 2025",
    slug: "hill-station-property-market-trends-2025",
    excerpt: "",
    content: `
     <h2>1. The Growing Trend of Plot Investment in 2025</h2>
     <p>In 2025, more and more property buyers are turning towards plot investment instead of purchasing ready flats or apartments. The reason is simple - land is a limited asset that appreciates in value over time, while constructed properties often lose value as they age. With the expansion of cities, improved connectivity, and new infrastructure projects, the demand for residential plots has increased significantly across India. People now prefer buying land because it gives them the freedom to build according to their lifestyle and needs. Unlike a flat, a plot is a blank canvas that allows you to create your dream home exactly the way you imagine it.</p>
     <h2>2. Complete Freedom to Design and Build Your Dream Home</h2>
     <p>When you buy a flat, you are bound by the builder’s structure, design, and layout - there’s very little scope for personalization. On the other hand, purchasing a plot gives you complete creative freedom to design a home that truly reflects your taste and personality. You can choose your own architect, materials, interiors, and even the number of floors you wish to build. You can also plan your home construction in phases as per your financial comfort. This flexibility makes plots ideal for families who value customization and long-term living satisfaction. Every corner of your house can be crafted with your vision, not someone else’s plan.</p>
     <h2>3. Land Appreciates - Flats Depreciate Over Time</h2>
     <p>One of the biggest reasons to prefer a plot over a flat is long-term value appreciation. Land is a natural, non-depreciating asset - its value continues to rise as urbanization spreads and demand increases. Flats, however, start to lose value as buildings age, maintenance issues grow, and design standards change. Over 10–15 years, a plot in a developing area can multiply in value far more than an apartment in a crowded city center. This is why experienced investors prefer land - it’s a stable, inflation-proof investment that offers better returns and inheritance value for future generations.</p>
     <h2>4. Lower Maintenance and Ownership Costs</h2>
     <p>Owning a flat comes with monthly society fees, maintenance charges, parking fees, and repair costs - all of which can add up to a big amount annually. A plot, however, has minimal recurring expenses. You only pay basic property taxes and minor upkeep costs if you choose to maintain it. This makes land ownership far more economical in the long run. Moreover, with a plot, there’s no dependency on builders or society associations - you have full control over your property without worrying about rising maintenance costs or disputes. This independence adds both peace of mind and long-term financial relief.</p>
     <h2>5. Flexibility and Long-Term Potential</h2>
     <p>Another big advantage of owning a plot is its future flexibility. You can hold it as an investment, build your home later, or even sell it when the area develops. The versatility of land makes it an ideal asset for every type of buyer - from investors to homeowners. As cities expand, well-located plots often become valuable assets for commercial or residential projects. This adaptability ensures that your investment remains relevant no matter how market trends change. In simple terms, buying land gives you complete control and endless potential, something a flat can never match.</p>
    `,
    category: "Market Analysis",
    tags: ["Market Trends", "2024 Predictions", "Hill Stations", "Property Market"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2025-10-27",
    lastModified: "2025-10-27",
    views: 645,
    featured: false,
    metaTitle: "Hill Station Property Market Trends & Predictions 2024",
    metaDescription:
      "Complete analysis of hill station property market trends in Uttrakhand. Expert predictions and investment insights for 2024.",
    image: "/images/WhatsApp Image 2025-10-13 at 23.57.03_a5777e2d.jpg",
  },
]

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug && p.status === "Published")

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.status === "Published" && p.category === post.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-4 left-4">
          <Button asChild variant="secondary" size="sm">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Content */}
      <article className="container py-12 text-center text-black">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="w-3 h-3 mr-1" />
                {post.views.toLocaleString()} views
              </div>
              {post.featured && (
                <Badge className="bg-primary text-primary-foreground">Featured</Badge>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-serif font-black text-foreground mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(post.publishedDate)}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  5 min read
                </div>
              </div>
            
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Article Body */}
          <div
  className="prose prose-lg mx-auto text-black"
  style={{
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
    lineHeight: "1.8",
    fontSize: "1.1rem",
  }}
>
  <div dangerouslySetInnerHTML={{ __html: post.content }} />
</div>



          {/* Call to Action */}
          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-serif font-bold mb-4">
                Ready to Invest in Uttrakhand Properties?
              </h3>
              <p className="text-muted-foreground mb-6">
                Explore our curated selection of premium plots in Uttrakhand's most sought-after locations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/plots">
                    View Available Plots
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    Get Expert Consultation
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif font-bold mb-8">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{relatedPost.category}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {relatedPost.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={`/blog/${relatedPost.slug}`}>
                          Read More
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  )
}

// Generate static paths for all published blog posts
export async function generateStaticParams() {
  return blogPosts
    .filter((post) => post.status === "Published")
    .map((post) => ({
      slug: post.slug,
    }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug && p.status === "Published")
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image],
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.lastModified,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

