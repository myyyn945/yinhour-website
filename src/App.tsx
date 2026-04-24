import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CryptoJS from 'crypto-js';
import { 
  Scale,
  Droplet,
  Microscope,
  Factory,
  Beaker,
  ChevronDown,
  Menu,
  X,
  Globe,
  Cpu,
  Zap,
  Shield,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Data ---

const AMAP_KEY = '858b623d913a2aed3f753df42cc60c55';
const AMAP_SECRET = 'a9355dfcf13a443b0a2681556317ebca';

interface SectionData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  primaryBtn?: string;
  secondaryBtn?: string;
  isInteractive?: boolean;
  isPartners?: boolean;
  isProducts?: boolean;
  isNews?: boolean;
  buttons?: { label: string; href?: string; type?: 'domestic' | 'international'; primary: boolean }[];
  productList?: { name: string; icon: React.ReactNode }[];
  cases?: { name: string; desc: string }[];
  key?: React.Key;
}

const getAmapStaticMapUrl = () => {
  // Coordinates for 成都市成华区三友路3号
  const lng = '104.0912';
  const lat = '30.6825';
  
  const params: Record<string, string> = {
    key: AMAP_KEY,
    location: `${lng},${lat}`,
    markers: `mid,red,1:${lng},${lat}`,
    zoom: '16',
    size: '640*360',
    scale: '2'
  };

  const sortedKeys = Object.keys(params).sort();
  const signString = sortedKeys.map(key => `${key}=${params[key]}`).join('&') + AMAP_SECRET;
  const sig = CryptoJS.MD5(signString).toString();
  
  const urlParams = sortedKeys
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
  
  return `https://restapi.amap.com/v3/staticmap?${urlParams}&sig=${sig}`;
};

const sections: SectionData[] = [
  {
    id: 'home',
    title: '寅时・智能',
    subtitle: '智启寅时 · 科创未来',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000',
    primaryBtn: '开启探索之旅',
  },
  {
    id: 'mission',
    title: '公司使命',
    subtitle: '以科技创新为引擎，打破物理与数字世界的边界',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=2000',
    primaryBtn: '愿景展望',
    secondaryBtn: '核心价值',
  },
  {
    id: 'products',
    title: '领先AI解决方案',
    subtitle: '显微智能・体智运维・数智未来',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000',
    secondaryBtn: '预约演示',
    isProducts: true,
    productList: [
      { name: '微观AI智视', icon: <Globe size={20} /> },
      { name: '行业AI孪生', icon: <Cpu size={20} /> },
      { name: '个人AI分身', icon: <Zap size={20} /> },
      { name: '服务AI相伴', icon: <Shield size={20} /> },
    ]
  },
  {
    id: 'news',
    title: '行业动态',
    subtitle: '获取最新的技术突破与行业前瞻',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2000',
    isNews: true,
  },
  {
    id: 'partners',
    title: '合作伙伴',
    subtitle: '卓越案例，共创价值',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000',
    primaryBtn: '查看更多案例',
    secondaryBtn: '成为伙伴',
    isPartners: true,
    cases: [
      { name: '成都某大型光模块龙头企业', desc: '智能产线升级，效率提升 45%', icon: <Cpu size={24} /> },
      { name: '广东某血液制品领军企业', desc: 'AI自动化检测准确率提升75%，实现QC自动化/精准化/合规化', icon: <Droplet size={24} /> },
      { name: '成都某知名律师事务所', desc: 'AI实现标准化/高频次/即时性工作，专业律师超级延伸版', icon: <Scale size={24} /> },
      { name: '成都某石油科技公司', desc: 'AI深度助力化学剂研发，提升产品稳定适应性', icon: <Factory size={24} /> },
      { name: '成都某著名专业药物非临床安全性评价机构', desc: '微观世界AI智视，服务新特药研发', icon: <Microscope size={24} /> },
    ]
  },
  {
    id: 'ideas',
    title: '奇思AI想',
    subtitle: '您的想法我来构建，美好未来携手同行',
    image: 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&q=80&w=2000',
    primaryBtn: '提交创意',
    secondaryBtn: '查看灵感',
    isInteractive: true,
  }
];

const domesticNews = [
  {
    id: 1,
    title: "智谱AI发布全新大模型ChatGLM-4",
    summary: "性能大幅提升，在多维基准测试中表现优异，进一步缩小了与国际顶尖模型的差距。新模型在理解、生成和逻辑推理方面都有了显著进步。",
    date: "2026-04-23",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    category: "模型发布",
    url: "https://www.aibase.com/zh"
  },
  {
    id: 2,
    title: "腾讯混元大模型全面向企业开放",
    summary: "助力各行各业实现数智化转型，提供更加灵活的API接入与定制化方案。目前已有超过100家行业领先企业接入测试。",
    date: "2026-04-22",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    category: "行业落地",
    url: "https://www.aibase.com/zh"
  },
  {
    id: 3,
    title: "字节跳动发布自研视频大模型PixelDance",
    summary: "视频生成更连贯，支持更长时长的复杂动作逻辑生成，引起行业广泛关注。该技术将在短视频创作和广告营销中发挥巨大潜力。",
    date: "2026-04-21",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    category: "多模态",
    url: "https://www.aibase.com/zh"
  },
  {
    id: 4,
    title: "百度文心一言用户数突破3亿",
    summary: "生态应用蓬勃发展，成为国内用户量最大的生成式AI平台之一。百度正致力于通过插件系统和插件市场进一步丰富其生态系统。",
    date: "2026-04-20",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
    category: "市场动态",
    url: "https://www.aibase.com/zh"
  },
  {
    id: 5,
    title: "阿里的通义千问模型开源更多版本",
    summary: "通义千问再次刷新开源大模型底座能力，发布多款不同尺寸的开源模型，推动AI生态普惠。",
    date: "2026-04-19",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    category: "开源生态",
    url: "https://www.aibase.com/zh"
  },
  {
    id: 6,
    title: "科大讯飞星火大模型升级V4.0版本",
    summary: "重点升级了底座能力，在文本生成、语言理解、知识问答等方面实现全面超越，为教育和医疗领域带来新应用。",
    date: "2026-04-18",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=800",
    category: "技术突破",
    url: "https://www.aibase.com/zh"
  }
];

const internationalNews = [
  {
    id: 1,
    title: "OpenAI 'Strawberry' reasoning model",
    summary: "OpenAI is reportedly developing a new model code-named 'Strawberry' designed to handle complex reasoning tasks with higher precision, moving closer to AGI.",
    date: "2026-04-23",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800",
    category: "R&D",
    url: "https://www.bloomberg.com/ai"
  },
  {
    id: 2,
    title: "Nvidia hits all-time high on AI chip demand",
    summary: "The GPU giant sees unprecedented growth as data centers around the world rapidly expand their AI training capabilities. Market cap continues to soar.",
    date: "2026-04-22",
    image: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800",
    category: "Finance",
    url: "https://www.bloomberg.com/ai"
  },
  {
    id: 3,
    title: "Anthropic launches Claude 3.5 Sonnet",
    summary: "New benchmarks show Claude 3.5 Sonnet outperforming competitors in coding, translation, and text analysis tasks, setting a new industry bar for intelligence.",
    date: "2026-04-21",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    category: "Benchmark",
    url: "https://www.bloomberg.com/ai"
  },
  {
    id: 4,
    title: "Mistral Large 2 sets new open-weights standard",
    summary: "The European AI powerhouse releases its most capable model yet, challenging the dominance of closed-source giants with efficient hardware utilization.",
    date: "2026-04-20",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    category: "Open Source",
    url: "https://www.bloomberg.com/ai"
  },
  {
    id: 5,
    title: "Meta releases LLaMA 4",
    summary: "The highly anticipated open-weights model introduces breakthrough architecture for multimodality and significantly longer context windows.",
    date: "2026-04-19",
    image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&q=80&w=800",
    category: "Open Source",
    url: "https://www.bloomberg.com/ai"
  },
  {
    id: 6,
    title: "Google DeepMind unveils Gemini 2.0",
    summary: "New capabilities in logic integration and real-time environment adaptation push the boundaries of spatial computing and robotics.",
    date: "2026-04-18",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    category: "Model Release",
    url: "https://www.bloomberg.com/ai"
  }
];

const navLinks = [
  { name: '首页', href: '#home' },
  { name: '使命', href: '#mission' },
  { name: '产品', href: '#products' },
  { name: '动态', href: '#news' },
  { name: '伙伴', href: '#partners' },
  { name: '创意', href: '#ideas' },
];

// --- Components ---

const CoreValuesModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-2xl z-[120] cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotateX: 15 }}
            onClick={onClose}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl z-[130] perspective-2000 pointer-events-none"
          >
            {/* Sci-fi Frame Container */}
            <div 
              onClick={onClose}
              className="relative bg-black/60 border border-[#F1E5AC]/20 rounded-xl p-1 overflow-hidden shadow-[0_0_100px_rgba(241,229,172,0.05)] pointer-events-auto cursor-pointer"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#F1E5AC]/40 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#F1E5AC]/40 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#F1E5AC]/40 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#F1E5AC]/40 rounded-br-xl" />
              
              {/* Background HUD elements */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F1E5AC]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#F1E5AC]/40 to-transparent" />

              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(241,229,172,0.01),rgba(241,229,172,0.01),rgba(241,229,172,0.01))] bg-[length:100%_3px,2px_100%] opacity-20" />

              <div className="relative p-10 md:p-20 flex flex-col items-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-16"
                >
                  <h3 className="text-[#F1E5AC]/70 font-tech text-[10px] md:text-xs uppercase tracking-[0.5em] mb-4">Strategic Initiatives // 核心发展战略</h3>
                  <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#F1E5AC]/30 to-transparent mx-auto relative group-hover:via-[#F1E5AC]/60 transition-all">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-1 bg-[#F1E5AC] rounded-full shadow-[0_0_10px_rgba(241,229,172,0.5)]" />
                  </div>
                </motion.div>

                <div className="space-y-8 md:space-y-12 w-full overflow-hidden">
                  {[
                    { zh: "以AI技术为驱动", en: "DRIVEN BY CORE AI TECHNOLOGY" },
                    { zh: "以产学研合为支撑", en: "SUPPORTED BY UNIVERSITY-INDUSTRY SYNERGY" },
                    { zh: "寅时启智 数赋生科 智创材料 赋能未来", en: "INTELLIGENT INSIGHT DIGITAL LIFE SCIENCES INNOVATIVE MATERIALS EMPOWERING THE FUTURE" }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (idx * 0.2) }}
                      className="group flex flex-col items-center w-full px-2 md:px-8"
                    >
                      <span className="text-[clamp(1rem,3.8vw,2rem)] font-display font-light text-white tracking-[0.25em] mb-3 group-hover:text-[#F1E5AC] transition-all duration-700 whitespace-nowrap drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        {item.zh}
                      </span>
                      <span className={`${idx === 2 ? 'text-[clamp(5px,0.8vw,7.5px)] tracking-[0.2em]' : 'text-[clamp(6px,1.1vw,9px)] tracking-[0.4em]'} font-tech font-light text-[#F1E5AC]/40 uppercase whitespace-nowrap group-hover:text-[#F1E5AC]/80 transition-colors duration-700`}>
                        {item.en}
                      </span>
                      {/* Decorative Line with Pulsing Glow */}
                      <div className="relative w-12 group-hover:w-full h-[1px] bg-amber-950/30 mt-8 transition-all duration-1000 ease-in-out">
                        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-r from-transparent via-[#F1E5AC]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 1.5 }}
                  className="mt-20 text-[#F1E5AC]/30 text-[10px] font-mono tracking-[0.5em] uppercase"
                >
                  Click Anywhere to Return // 点击任意位置返回
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CompanyProfileModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[140] cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl bg-white rounded-2xl z-[150] shadow-2xl max-h-[85vh] flex flex-col cursor-default overflow-hidden"
          >
            {/* Header - Fixed at top */}
            <div className="flex justify-between items-start p-8 md:px-12 md:py-10 border-b border-gray-100 bg-white">
              <div>
                <h3 className="text-3xl font-bold text-[#171a20] mb-2 font-display">公司简介</h3>
                <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">Company Profile</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-black/5 rounded-full transition-colors -mr-2"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Content Area - Scrollable */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              <div className="space-y-6 text-[#171a20]/80 leading-relaxed text-base md:text-lg">
                <p className="first-letter:text-4xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-[#171a20]">
                  成都市寅时智能科技有限责任公司是一家专注于人工智能技术应用、生物制药高效研发、生物实验室智能化、显微技术创新的高新技术企业。公司核心团队均毕业于电子科技大学，拥有Oracle、摩托罗拉、联想等国内外知名科技企业资深从业背景，在AI算法、软件开发、精密光学、系统集成与数据智能领域具备深厚技术积累与成熟项目交付能力。
                </p>
                <p>
                  公司坚持产学研深度协同，与电子科技大学、四川农业大学等高校科研团队保持长期紧密合作，并与华西等国家级高新技术实验室建立稳定的前沿技术合作体系，持续推动科研成果落地转化。
                </p>
                <p>
                  公司以AI服务为核心能力，聚焦行业数字化转型与智能化升级，通过人工智能技术为生物制药、材料科学、石油行业等领域提供AI辅助研发、AI智能分析、AI数据处理、AI决策支撑等关键能力，打造覆盖全流程、一体化、可落地的AI行业转型解决方案，以完整技术体系支撑企业高效研发、智能管控与产业升级。
                </p>
                <p>
                  同时，公司在材料科学领域拥有丰富实践案例，尤其在石油行业材料检测、材料分析与工业材料数字化管理方面积累了大量成熟客户应用，形成跨行业、多场景的综合解决方案能力。
                </p>
                <p className="font-medium text-[#171a20]">
                  时序寅光，智启新程。未来，寅时智能将始终以 AI 前沿技术为核心引擎，依托产学研深度协同的创新生态，深耕生物制药、生命科学、材料工程等关键领域。我们持续打磨稳定、高效、定制化的一体化智能解决方案，聚焦产业痛点，释放科技价值，以数智力量驱动产业变革、赋能提质升级，携手各行各业奔赴数字化、智能化高质量发展新征程。
                </p>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
                <button 
                  onClick={onClose}
                  className="bg-[#171a20] text-white px-12 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  返回
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const DemoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        setFormData({ name: '', company: '', phone: '', email: '', requirements: '' });
      }, 2000);
    } catch (err) {
      console.error('Error sending demo request:', err);
      alert('抱歉，邮件发送失败。如果您配置了自定义域名，请检查Resend API密钥及发送限制。');
      
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[160] cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-lg bg-white rounded-2xl z-[170] shadow-2xl overflow-hidden cursor-default flex flex-col"
          >
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h3 className="text-2xl font-bold text-[#171a20] mb-1 font-display">预约产品演示</h3>
                <p className="text-gray-400 font-mono text-[10px] uppercase tracking-widest">Book a Product Demo</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
                disabled={isSubmitting}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto max-h-[70vh]">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Zap className="text-green-500 w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">预约提交成功</h4>
                    <p className="text-gray-500">我们的专家团队将会在24小时内与您取得联系。</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">个人姓名</label>
                        <input 
                          required
                          type="text"
                          placeholder="您的姓名"
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all text-sm"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">公司名称</label>
                        <input 
                          required
                          type="text"
                          placeholder="所属公司/机构"
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all text-sm"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">手机号码</label>
                        <input 
                          required
                          type="tel"
                          placeholder="您的手机号"
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all text-sm"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">电子邮箱</label>
                        <input 
                          required
                          type="email"
                          placeholder="您的邮箱地址"
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all text-sm"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">详细演示需求</label>
                      <textarea 
                        required
                        placeholder="请描述您的业务场景或希望演示的功能点..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all text-sm min-h-[120px] resize-none"
                        value={formData.requirements}
                        onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                      />
                    </div>

                    <button 
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-[#171a20] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center justify-center gap-2 group"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          提交预约申请
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[300]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-3xl p-8 z-[310] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] max-h-[90vh] overflow-y-auto cursor-default border border-white/10"
        >
          <div className="flex justify-between items-start mb-8">
            <div className="pr-12">
              <h3 className="text-3xl font-black text-[#171a20] mb-2 font-display leading-tight">联系我们</h3>
              <p className="text-gray-400 font-medium text-sm tracking-wide uppercase">期待与您的合作 / CONTACT US</p>
            </div>
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 hover:bg-black/5 rounded-full transition-all hover:rotate-90 duration-300"
            >
              <X size={24} />
            </button>
          </div>
          
            <div className="space-y-8">
            <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 group hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-500">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-white rounded-2xl shadow-sm text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[#171a20] font-bold text-lg tracking-tight">成都市成华区三友路3号三友岛2-11室</p>
                </div>
              </div>
            </div>

            <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-gray-200 relative group bg-gray-100 shadow-inner">
              <img 
                src={getAmapStaticMapUrl()} 
                alt="成都市寅时智能科技有限责任公司地址地图"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&q=80&w=800";
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 flex items-center justify-center">
                <a 
                  href="https://uri.amap.com/marker?position=104.0912,30.6825&name=成都寅时智能&coordinate=gaode&callnative=1" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-[#171a20] text-white px-8 py-3 rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/20 text-sm tracking-wider"
                >
                  <MapPin size={18} className="text-cyan-400" />
                  在高德地图查看详情
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-white transition-all duration-300 group">
                <p className="text-[10px] text-cyan-600 font-bold mb-1.5 tracking-[0.2em] uppercase">商务合作 / Business</p>
                <p className="text-sm font-bold text-[#171a20] group-hover:text-cyan-700 transition-colors tracking-wide">bd@yinhour.com</p>
              </div>
              <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-white transition-all duration-300 group">
                <p className="text-[10px] text-cyan-600 font-bold mb-1.5 tracking-[0.2em] uppercase">加入我们 / Careers</p>
                <p className="text-sm font-bold text-[#171a20] group-hover:text-cyan-700 transition-colors tracking-wide">contact@yinhour.com</p>
              </div>
            </div>

            <div className="pt-4 text-center">
              <p className="text-[10px] text-gray-300 font-medium tracking-[0.3em] uppercase">
                © {new Date().getFullYear()} In Time Intelligent Technology
              </p>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const Navbar = ({ onContactClick, onCloseAll }: { 
  onContactClick: () => void; 
  onCloseAll?: () => void;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollParent = document.querySelector('main');
      if (!scrollParent) return;

      const currentScrollY = scrollParent.scrollTop;
      
      // Show navbar if scrolling up or at the top
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down - hide
      } else {
        setIsVisible(true); // Scrolling up - show
      }
      
      setLastScrollY(currentScrollY);
    };

    const scrollParent = document.querySelector('main');
    if (scrollParent) {
      scrollParent.addEventListener('scroll', handleScroll);
      return () => scrollParent.removeEventListener('scroll', handleScroll);
    }
  }, [lastScrollY]);

  return (
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center border-b border-white/5 bg-black/40 backdrop-blur-md"
    >
      <div className="w-full max-w-7xl px-8 py-4 flex items-center justify-between">
        <div className="flex-1">
          <a href="#home" onClick={onCloseAll} className="flex items-center min-h-[40px]">
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt="In Time Brand" 
                className="h-10 md:h-14 w-auto object-contain"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="font-bold text-xl tracking-[0.2em] text-white uppercase font-display">
                寅时・智能
              </span>
            )}
          </a>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-tech font-semibold text-white px-4 py-2 rounded-md hover:bg-white/10 transition-colors uppercase tracking-[0.2em]"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex-1 flex justify-end gap-4">
          <button 
            onClick={onContactClick}
            className="hidden md:block text-xs font-tech font-semibold text-white px-6 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors uppercase tracking-[0.2em]"
          >
            联系我们
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-[70] p-8 shadow-2xl"
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-bold text-[#171a20] px-4 py-3 rounded-md hover:bg-black/5 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="h-px bg-black/10 my-4" />
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onContactClick();
                  }}
                  className="text-left text-base font-bold text-[#171a20] px-4 py-3 rounded-md hover:bg-black/5 transition-colors"
                >
                  联系我们
                </button>
                <a href="#" className="text-base font-bold text-[#171a20] px-4 py-3 rounded-md hover:bg-black/5 transition-colors">关于寅时</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Section = ({ section, onPrimaryClick, onSecondaryClick }: { 
  section: SectionData, 
  onPrimaryClick?: (id: string) => void, 
  onSecondaryClick?: (id: string) => void,
  key?: React.Key 
}) => {
  const [idea, setIdea] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: idea.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setIdea('');
    } catch (err) {
      console.error('Error sending idea:', err);
      alert('抱歉，创意提交失败。如果您配置了自定义域名，请检查Resend API密钥及发送限制。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id={section.id}
      className={cn(
        "relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-24 snap-start overflow-hidden",
        section.id === 'home' && "snap-always"
      )}
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={section.image} 
          alt={section.title} 
          className="w-full h-full object-cover brightness-75"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center px-6 mb-12 sm:mb-16 lg:mb-20"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white mb-4 tracking-tight drop-shadow-lg">
          {section.title}
        </h1>
        <p className="text-sm md:text-base text-white/90 font-tech font-light uppercase tracking-[0.2em] underline underline-offset-[8px] decoration-1 decoration-white/50 drop-shadow-md">
          {section.subtitle}
        </p>
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center gap-8">
        {section.isInteractive ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="flex flex-col gap-4"
                >
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="在这里写下您的奇思妙想..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 min-h-[120px] resize-none"
                  />
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-white text-[#171a20] py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-white/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      '提交创意'
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">感谢您的分享！</h3>
                  <p className="text-white/60">您的创意已点亮我们的灵感之火。</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : section.isPartners ? (
          <>
            <style>{`
              @keyframes slide-left {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
            `}</style>
            <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-8 relative z-10">
              <div 
                className="flex w-max gap-4 md:gap-6 pr-4 md:pr-6"
                style={{ 
                  animation: 'slide-left 25s linear infinite',
                  animationPlayState: selectedPartner ? 'paused' : 'running'
                }}
                onMouseEnter={(e) => {
                  if (!selectedPartner) {
                    e.currentTarget.style.animationPlayState = 'paused';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedPartner) {
                    e.currentTarget.style.animationPlayState = 'running';
                  }
                }}
              >
                {[...(section.cases || []), ...(section.cases || [])].map((item, idx) => (
                  <motion.div
                    key={`${item.name}-${idx}`}
                    onMouseEnter={() => setSelectedPartner({ ...item, idx })}
                    onMouseLeave={() => setSelectedPartner(null)}
                    className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl hover:bg-white/30 hover:scale-[1.05] transition-all duration-300 cursor-pointer group w-[280px] sm:w-[320px] shrink-0 flex flex-col relative"
                  >
                    <div className="absolute top-4 right-4 text-white/20 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </div>
                    <h4 className="text-white font-bold mb-3 flex items-start gap-2 pr-8">
                      <span className="line-clamp-2 leading-snug group-hover:line-clamp-none transition-all">{item.name}</span>
                    </h4>
                    <p className="text-white/60 text-sm mt-auto group-hover:text-white/90 transition-colors">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {selectedPartner && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-none"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white/15 backdrop-blur-xl border border-white/30 p-8 rounded-2xl shadow-2xl shadow-cyan-500/20 w-[90%] max-w-md pointer-events-none relative z-10"
                  >
                    <div className="absolute top-6 right-6 text-cyan-400 scale-150">
                      {selectedPartner.icon}
                    </div>
                    <h4 className="text-white font-bold mb-6 pr-12 text-2xl leading-snug">
                      {selectedPartner.name}
                    </h4>
                    <p className="text-white/80 text-lg leading-relaxed">{selectedPartner.desc}</p>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </>
        ) : section.isProducts ? (
          <div className="w-full flex flex-col gap-8 md:gap-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {section.productList?.map((product, idx) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex flex-col items-center gap-3 hover:bg-white/20 transition-all cursor-pointer group"
                >
                  <div className="text-white/70 group-hover:text-white transition-colors">
                    {product.icon}
                  </div>
                  <span className="text-white text-xs font-bold tracking-wider uppercase">{product.name}</span>
                </motion.div>
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full max-w-xl mx-auto flex flex-col sm:flex-row gap-4"
            >
              {section.primaryBtn && (
                <button 
                  onClick={() => onPrimaryClick?.(section.id)}
                  className="flex-1 bg-white text-[#171a20] px-12 py-3 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-white/90 transition-all"
                >
                  {section.primaryBtn}
                </button>
              )}
              {section.secondaryBtn && (
                <button 
                  onClick={() => onSecondaryClick?.(section.id)}
                  className="flex-1 bg-white/15 backdrop-blur-md text-white border border-white/20 px-12 py-3 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-white/25 transition-all"
                >
                  {section.secondaryBtn}
                </button>
              )}
            </motion.div>
          </div>
        ) : section.isNews ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 h-[60vh] min-h-[400px] mt-4">
            {/* Left Card: Domestic */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 flex flex-col h-full overflow-hidden hover:bg-white/[0.15] transition-colors"
            >
              <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-cyan-400 rounded-full"></span>
                国内动态
                <span className="text-xs font-mono text-white/40 font-normal tracking-widest uppercase ml-auto">China</span>
              </h3>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {domesticNews.map(item => (
                  <div 
                    key={item.id} 
                    className="group bg-black/20 hover:bg-black/40 border border-white/5 hover:border-white/20 rounded-2xl p-4 transition-all cursor-pointer flex gap-4 h-32"
                    onClick={() => window.open(item.url, '_blank')}
                  >
                    <div className="w-24 h-full shrink-0 rounded-xl overflow-hidden hidden sm:block">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col flex-1 h-full justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1.5">
                          <span className="text-cyan-400 text-[10px] font-mono tracking-widest">{item.date}</span>
                          <span className="bg-white/10 text-white/80 text-[10px] px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/5">{item.category}</span>
                        </div>
                        <h4 className="text-white font-bold text-sm mb-1.5 group-hover:text-cyan-400 transition-colors line-clamp-1">{item.title}</h4>
                        <p className="text-white/60 text-xs line-clamp-2 leading-relaxed">{item.summary}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Card: International */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 flex flex-col h-full overflow-hidden hover:bg-white/[0.15] transition-colors"
            >
              <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-purple-400 rounded-full"></span>
                国际动态
                <span className="text-xs font-mono text-white/40 font-normal tracking-widest uppercase ml-auto">Global</span>
              </h3>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {internationalNews.map(item => (
                  <div 
                    key={item.id} 
                    className="group bg-black/20 hover:bg-black/40 border border-white/5 hover:border-white/20 rounded-2xl p-4 transition-all cursor-pointer flex gap-4 h-32"
                    onClick={() => window.open(item.url, '_blank')}
                  >
                    <div className="w-24 h-full shrink-0 rounded-xl overflow-hidden hidden sm:block">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col flex-1 h-full justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1.5">
                          <span className="text-purple-400 text-[10px] font-mono tracking-widest">{item.date}</span>
                          <span className="bg-white/10 text-white/80 text-[10px] px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/5">{item.category}</span>
                        </div>
                        <h4 className="text-white font-bold text-sm mb-1.5 group-hover:text-purple-400 transition-colors line-clamp-1">{item.title}</h4>
                        <p className="text-white/60 text-xs line-clamp-2 leading-relaxed">{item.summary}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-xl flex flex-col sm:flex-row gap-4"
          >
            {section.primaryBtn && (
              <button 
                onClick={() => onPrimaryClick?.(section.id)}
                className="flex-1 bg-white/15 backdrop-blur-md text-white border border-white/20 px-12 py-3 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-white/25 transition-all"
              >
                {section.primaryBtn}
              </button>
            )}
            {section.secondaryBtn && (
              <button 
                onClick={() => onSecondaryClick?.(section.id)}
                className="flex-1 bg-[#171a20]/60 backdrop-blur-md text-white px-12 py-3 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-[#171a20]/80 transition-all"
              >
                {section.secondaryBtn}
              </button>
            )}
          </motion.div>
        )}
      </div>

      {section.id === 'home' && (
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white z-20"
        >
          <ChevronDown size={32} strokeWidth={1.5} />
        </motion.div>
      )}
    </section>
  );
};

export default function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCoreValuesOpen, setIsCoreValuesOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);

  const handlePrimaryClick = (sectionId: string) => {
    if (sectionId === 'home') {
      const el = document.getElementById('products');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback for Safari/compat
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    } else if (sectionId === 'mission') {
      setIsProfileOpen(true);
    }
  };

  const handleSecondaryClick = (sectionId: string) => {
    if (sectionId === 'mission') {
      setIsCoreValuesOpen(true);
    } else if (sectionId === 'products') {
      setIsDemoModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsProfileOpen(false);
    setIsCoreValuesOpen(false);
    setIsDemoModalOpen(false);
    setIsContactModalOpen(false);
    setIsPrivacyOpen(false);
    setIsLegalOpen(false);
  };

  return (
    <div className="h-screen overflow-hidden" onClick={() => (isProfileOpen || isCoreValuesOpen || isDemoModalOpen || isContactModalOpen || isPrivacyOpen || isLegalOpen) && closeModal()}>
      <Navbar 
        onContactClick={() => setIsContactModalOpen(true)} 
        onCloseAll={closeModal}
      />
      <CompanyProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <CoreValuesModal isOpen={isCoreValuesOpen} onClose={() => setIsCoreValuesOpen(false)} />
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[400]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-2xl p-8 z-[410] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 text-[#171a20]">隐私政策</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                本隐私政策适用于本网站所有访问用户、注册用户及服务使用者，访问、使用本网站即视为同意本政策全部条款。本站严格保护用户个人隐私，仅收集业务必要信息，用于服务对接与网站优化，不会非法泄露、出售用户信息，合理使用 Cookie 提升浏览体验，政策将不定期更新公示。
              </p>
              <div className="mt-8 flex justify-end">
                <button onClick={closeModal} className="px-6 py-2 bg-[#171a20] text-white rounded-full text-sm font-bold">我知道了</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Legal Notice Modal */}
      <AnimatePresence>
        {isLegalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[400]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-2xl p-8 z-[410] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 text-[#171a20]">法律声明</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                本站所有内容版权归本企业所有，未经授权禁止商用转载。网站内容仅供参考，不构成专业建议，因第三方行为或自行使用产生的风险由用户自行承担，本站保留最终解释权。
              </p>
              <div className="mt-8 flex justify-end">
                <button onClick={closeModal} className="px-6 py-2 bg-[#171a20] text-white rounded-full text-sm font-bold">我知道了</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <main className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth overflow-x-hidden">
        {sections.map((section) => (
          <Section 
            key={section.id} 
            section={section} 
            onPrimaryClick={handlePrimaryClick}
            onSecondaryClick={handleSecondaryClick}
          />
        ))}

        {/* Footer (Minimalist) */}
        <footer className="bg-white py-8 flex flex-col items-center gap-4 snap-start">
          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-[#5c5e62]">
            <p>© 2026 成都寅时智能</p>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsPrivacyOpen(true); }}
              className="hover:text-black transition-colors"
            >
              隐私政策
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsLegalOpen(true); }}
              className="hover:text-black transition-colors"
            >
              法律声明
            </button>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">蜀ICP备2026017298号</a>
            <a href="https://beian.mps.gov.cn/#/query/webSearch?code=51019002009363" rel="noreferrer" target="_blank" className="hover:text-black transition-colors flex items-center gap-1">
              <img 
                src="https://www.beian.gov.cn/img/ghs.png" 
                alt="公安徽标" 
                className="w-4 h-4 object-contain"
                referrerPolicy="no-referrer"
              />
              川公网安备51019002009363号
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
