import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Coffee, Zap, Sparkles, Phone, ChevronRight, CheckCircle, Send } from "lucide-react"
import Icon from "@/components/ui/icon"

type Theme = "day" | "night" | "coffee" | "mint" | "electric"

const themes: Record<Theme, {
  name: string
  icon: typeof Sun
  bg: string
  cardBg: string
  text: string
  textSecondary: string
  border: string
  accent: string
  buttonBg: string
  buttonText: string
  buttonHover: string
  tagBg: string
}> = {
  day: {
    name: "День",
    icon: Sun,
    bg: "bg-gray-50",
    cardBg: "bg-white",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    border: "border-gray-200",
    accent: "text-gray-900",
    buttonBg: "bg-gray-900",
    buttonText: "text-white",
    buttonHover: "hover:bg-gray-700",
    tagBg: "bg-gray-100",
  },
  night: {
    name: "Ночь",
    icon: Moon,
    bg: "bg-gray-900",
    cardBg: "bg-gray-800",
    text: "text-gray-100",
    textSecondary: "text-gray-400",
    border: "border-gray-700",
    accent: "text-gray-100",
    buttonBg: "bg-gray-100",
    buttonText: "text-gray-900",
    buttonHover: "hover:bg-gray-300",
    tagBg: "bg-gray-700",
  },
  coffee: {
    name: "Кофе",
    icon: Coffee,
    bg: "bg-amber-50",
    cardBg: "bg-amber-100",
    text: "text-amber-900",
    textSecondary: "text-amber-700",
    border: "border-amber-200",
    accent: "text-amber-800",
    buttonBg: "bg-amber-800",
    buttonText: "text-amber-50",
    buttonHover: "hover:bg-amber-700",
    tagBg: "bg-amber-200",
  },
  mint: {
    name: "Мята",
    icon: Sparkles,
    bg: "bg-emerald-50",
    cardBg: "bg-emerald-100",
    text: "text-emerald-900",
    textSecondary: "text-emerald-700",
    border: "border-emerald-200",
    accent: "text-emerald-800",
    buttonBg: "bg-emerald-800",
    buttonText: "text-emerald-50",
    buttonHover: "hover:bg-emerald-700",
    tagBg: "bg-emerald-200",
  },
  electric: {
    name: "Электро",
    icon: Zap,
    bg: "bg-slate-900",
    cardBg: "bg-slate-800",
    text: "text-cyan-100",
    textSecondary: "text-cyan-300",
    border: "border-cyan-500",
    accent: "text-cyan-400",
    buttonBg: "bg-cyan-500",
    buttonText: "text-slate-900",
    buttonHover: "hover:bg-cyan-400",
    tagBg: "bg-slate-700",
  },
}

const services = [
  {
    title: "Укладка плитки в ванной",
    price: "от 1 500 ₽/м²",
    features: ["Стены и пол", "Любой формат плитки", "Герметизация швов"],
  },
  {
    title: "Укладка на кухне",
    price: "от 1 200 ₽/м²",
    features: ["Фартук, пол", "Мозаика и крупный формат", "Подготовка основания"],
  },
  {
    title: "Укладка на улице / террасе",
    price: "от 1 800 ₽/м²",
    features: ["Морозостойкая плитка", "Дренажные уклоны", "Клинкер и керамогранит"],
  },
  {
    title: "Демонтаж старой плитки",
    price: "от 400 ₽/м²",
    features: ["Снятие с минимальными повреждениями", "Вывоз строительного мусора"],
  },
  {
    title: "Выравнивание стен / полов",
    price: "от 600 ₽/м²",
    features: ["Стяжка пола", "Штукатурка стен", "Гидроизоляция"],
  },
  {
    title: "Мозаика и декор",
    price: "от 2 500 ₽/м²",
    features: ["Сложные узоры", "Художественная укладка", "Панно и акценты"],
  },
]

const portfolio = [
  {
    image: "https://cdn.poehali.dev/projects/be735b2f-456c-4e57-8f8a-947b5f798411/files/f6ac004f-d21e-4561-aece-4b09f7fe5b89.jpg",
    title: "Ванная в стиле минимализм",
    tag: "Ванная",
  },
  {
    image: "https://cdn.poehali.dev/projects/be735b2f-456c-4e57-8f8a-947b5f798411/files/92c5fd6b-9d2b-4cfc-a8d0-95496ab33549.jpg",
    title: "Кухня с крупным форматом",
    tag: "Кухня",
  },
  {
    image: "https://cdn.poehali.dev/projects/be735b2f-456c-4e57-8f8a-947b5f798411/files/aca1a93e-9bd5-4c3b-870c-58243f9db3d2.jpg",
    title: "Терраса с натуральным камнем",
    tag: "Улица",
  },
]

const contactLinks = [
  {
    name: "Позвонить",
    icon: Phone,
    url: "tel:+79991234567",
    username: "+7 (999) 123-45-67",
    desc: "Пенза-Заречный · с 9:00 до 21:00",
  },
  {
    name: "ВКонтакте",
    icon: Send,
    url: "https://vk.com",
    username: "Написать ВКонтакте",
    desc: "Быстрый ответ на вопросы",
  },
  {
    name: "Мессенджер Макс",
    icon: Send,
    url: "https://max.ru",
    username: "Написать в Макс",
    desc: "Фото, вопросы, замер",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
}

const linkVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
  hover: {
    scale: 1.03,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.97 },
}

const themeButtonVariants = {
  hover: { scale: 1.1, rotate: 5, transition: { type: "spring", stiffness: 400, damping: 10 } },
  tap: { scale: 0.9, rotate: -5 },
}

export default function TileMasterLanding() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("day")
  const theme = themes[currentTheme]

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme.bg}`}>
      {/* Theme Switcher */}
      <motion.div
        className="fixed top-4 right-4 z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className={`flex gap-2 p-2 rounded-full ${theme.cardBg} ${theme.border} border-2`}>
          {Object.entries(themes).map(([key, themeData]) => {
            const IconComponent = themeData.icon
            return (
              <motion.button
                key={key}
                onClick={() => setCurrentTheme(key as Theme)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  currentTheme === key
                    ? `${theme.buttonBg} ${theme.buttonText}`
                    : `${theme.text}`
                }`}
                variants={themeButtonVariants}
                whileHover="hover"
                whileTap="tap"
                title={themeData.name}
              >
                <IconComponent size={16} />
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-4 py-16 max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-10" variants={itemVariants}>
          <motion.div
            className={`w-24 h-24 mx-auto mb-6 rounded-full ${theme.cardBg} ${theme.border} border-4 flex items-center justify-center text-4xl`}
            whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
          >
            🪵
          </motion.div>

          <motion.h1 className={`text-3xl font-bold mb-2 ${theme.text}`} variants={itemVariants}>
            Мастер по плитке
          </motion.h1>

          <motion.p className={`text-xl font-semibold mb-3 ${theme.accent}`} variants={itemVariants}>
            Алексей Петров
          </motion.p>

          <motion.p className={`${theme.textSecondary} text-base leading-relaxed`} variants={itemVariants}>
            Профессиональная укладка плитки, керамогранита и мозаики.<br />
            Более 10 лет опыта · Гарантия на работы · Пенза-Заречный
          </motion.p>
        </motion.div>

        {/* Contacts — prominent but not pushy */}
        <motion.div className="mb-10 space-y-3" variants={containerVariants}>
          <motion.h2 className={`text-xs uppercase tracking-widest font-bold ${theme.textSecondary} mb-4`} variants={itemVariants}>
            Связаться
          </motion.h2>
          <AnimatePresence>
            {contactLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full p-4 rounded-xl ${theme.cardBg} ${theme.border} border-2 transition-all duration-200`}
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${theme.buttonBg} ${theme.buttonText}`}>
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${theme.text}`}>{link.name}</h3>
                        <p className={`text-sm ${theme.textSecondary}`}>{link.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className={theme.textSecondary} />
                  </div>
                </motion.a>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Services & Prices */}
        <motion.div className="mb-10" variants={itemVariants}>
          <motion.h2 className={`text-xs uppercase tracking-widest font-bold ${theme.textSecondary} mb-4`} variants={itemVariants}>
            Услуги и расценки
          </motion.h2>
          <div className="space-y-3">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className={`p-4 rounded-xl ${theme.cardBg} ${theme.border} border-2`}
                variants={linkVariants}
                whileHover="hover"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-semibold ${theme.text}`}>{service.title}</h3>
                  <span className={`text-sm font-bold ml-3 shrink-0 ${theme.accent}`}>{service.price}</span>
                </div>
                <ul className="space-y-1">
                  {service.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-2 text-sm ${theme.textSecondary}`}>
                      <CheckCircle size={13} className={theme.accent} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Portfolio */}
        <motion.div className="mb-10" variants={itemVariants}>
          <motion.h2 className={`text-xs uppercase tracking-widest font-bold ${theme.textSecondary} mb-4`} variants={itemVariants}>
            Портфолио
          </motion.h2>
          <div className="grid grid-cols-1 gap-4">
            {portfolio.map((item, i) => (
              <motion.div
                key={i}
                className={`rounded-xl overflow-hidden ${theme.border} border-2`}
                variants={linkVariants}
                whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-52 object-cover"
                />
                <div className={`p-3 ${theme.cardBg} flex items-center justify-between`}>
                  <span className={`font-medium text-sm ${theme.text}`}>{item.title}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${theme.tagBg} ${theme.textSecondary}`}>{item.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div className="text-center" variants={itemVariants}>
          <p className={`text-xs ${theme.textSecondary}`}>
            Выезд на замер — бесплатно · Работаю по договору
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}