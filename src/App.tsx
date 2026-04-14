import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown,
  Menu,
  X,
  Globe,
  Cpu,
  Zap,
  Shield,
  ArrowRight
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Data ---

const sections = [
  {
    id: 'home',
    title: '寅时・智能',
    subtitle: '智启寅时 · 科创未来',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000',
    primaryBtn: '探索产品',
    secondaryBtn: '了解更多',
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
    primaryBtn: '了解详情',
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
    primaryBtn: '阅读新闻',
    secondaryBtn: '加入我们',
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
      { name: '成都某大型光模块龙头企业', desc: '智能产线升级，效率提升 45%' },
      { name: '广东某血液制品领军企业', desc: 'AI自动化检测准确率提升75%，实现QC自动化/精准化/合规化' },
      { name: '成都某知名律师事务所', desc: 'AI实现标准化/高频次/即时性工作，专业律师超级延伸版' },
      { name: '成都某石油科技公司', desc: 'AI深度助力化学剂研发，提升产品稳定适应性' },
      { name: '成都某著名专业药物非临床安全性评价机构', desc: '微观世界AI智视，服务新特药研发' },
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

const navLinks = [
  { name: '首页', href: '#home' },
  { name: '使命', href: '#mission' },
  { name: '产品', href: '#products' },
  { name: '动态', href: '#news' },
  { name: '伙伴', href: '#partners' },
  { name: '创意', href: '#ideas' },
];

// --- Components ---

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4">
      <div className="flex-1">
        <a href="#home" className="flex items-center">
          <img 
            src="https://storage.googleapis.com/static-content-ais-pre/hksrj54jthgo562lnkq4dq/attachments/d2296068-195c-433a-939e-d3059885145b.png" 
            alt="In Time Brand" 
            className="h-10 object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback to text if image fails
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent && !parent.querySelector('.brand-fallback')) {
                const fallback = document.createElement('span');
                fallback.className = 'brand-fallback font-bold text-xl tracking-[0.2em] text-white uppercase';
                fallback.innerText = '寅时・智能';
                parent.appendChild(fallback);
              }
            }}
          />
        </a>
      </div>

      <div className="hidden lg:flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm font-bold text-white px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="flex-1 flex justify-end gap-4">
        <button 
          className="text-white p-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
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
                <a href="#" className="text-base font-bold text-[#171a20] px-4 py-3 rounded-md hover:bg-black/5 transition-colors">关于寅时</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface SectionData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  primaryBtn: string;
  secondaryBtn: string;
  isInteractive?: boolean;
  isPartners?: boolean;
  isProducts?: boolean;
  productList?: { name: string; icon: React.ReactNode }[];
  cases?: { name: string; desc: string }[];
  key?: React.Key;
}

const Section = ({ section }: { section: SectionData, key?: React.Key }) => {
  const [idea, setIdea] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setIdea('');
    }
  };

  return (
    <section 
      id={section.id}
      className="relative h-screen w-full flex flex-col items-center justify-between py-24 snap-start overflow-hidden"
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
        className="relative z-10 text-center px-6 pt-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
          {section.title}
        </h1>
        <p className="text-sm md:text-base text-white/80 font-medium underline underline-offset-4 decoration-1">
          {section.subtitle}
        </p>
      </motion.div>

      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center gap-8">
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
                    type="submit"
                    className="w-full bg-white text-[#171a20] py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-white/90 transition-all"
                  >
                    提交创意
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
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.cases?.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all cursor-default group"
              >
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  <ArrowRight size={16} className="text-white/50 group-hover:translate-x-1 transition-transform" />
                  {item.name}
                </h4>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        ) : section.isProducts ? (
          <div className="w-full flex flex-col gap-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <button className="flex-1 bg-white text-[#171a20] px-12 py-3 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-white/90 transition-all">
                {section.primaryBtn}
              </button>
              <button className="flex-1 bg-white/15 backdrop-blur-md text-white border border-white/20 px-12 py-3 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-white/25 transition-all">
                {section.secondaryBtn}
              </button>
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
            <button className="flex-1 bg-white/15 backdrop-blur-md text-white border border-white/20 px-12 py-3 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-white/25 transition-all">
              {section.primaryBtn}
            </button>
            <button className="flex-1 bg-[#171a20]/60 backdrop-blur-md text-white px-12 py-3 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-[#171a20]/80 transition-all">
              {section.secondaryBtn}
            </button>
          </motion.div>
        )}

        {section.id === 'home' && (
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white"
          >
            <ChevronDown size={32} strokeWidth={1.5} />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      
      <main className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
        {sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}

        {/* Footer (Minimalist) */}
        <footer className="bg-white py-8 flex flex-col items-center gap-4 snap-start">
          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-[#5c5e62]">
            <p>© 2026 成都寅时智能</p>
            <a href="#" className="hover:text-black transition-colors">隐私政策</a>
            <a href="#" className="hover:text-black transition-colors">法律声明</a>
            <a href="#" className="hover:text-black transition-colors">加入我们</a>
            <a href="#" className="hover:text-black transition-colors">行业动态</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
