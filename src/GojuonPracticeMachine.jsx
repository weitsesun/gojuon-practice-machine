import { useMemo, useState, useEffect, useRef } from 'react'

export default function GojuonPracticeMachine() {
  const kanaList = [
    { kana: 'あ', romaji: ['a'], type: '平假名' },
    { kana: 'い', romaji: ['i'], type: '平假名' },
    { kana: 'う', romaji: ['u'], type: '平假名' },
    { kana: 'え', romaji: ['e'], type: '平假名' },
    { kana: 'お', romaji: ['o'], type: '平假名' },
    { kana: 'か', romaji: ['ka'], type: '平假名' },
    { kana: 'き', romaji: ['ki'], type: '平假名' },
    { kana: 'く', romaji: ['ku'], type: '平假名' },
    { kana: 'け', romaji: ['ke'], type: '平假名' },
    { kana: 'こ', romaji: ['ko'], type: '平假名' },
    { kana: 'さ', romaji: ['sa'], type: '平假名' },
    { kana: 'し', romaji: ['shi', 'si'], type: '平假名' },
    { kana: 'す', romaji: ['su'], type: '平假名' },
    { kana: 'せ', romaji: ['se'], type: '平假名' },
    { kana: 'そ', romaji: ['so'], type: '平假名' },
    { kana: 'た', romaji: ['ta'], type: '平假名' },
    { kana: 'ち', romaji: ['chi', 'ti'], type: '平假名' },
    { kana: 'つ', romaji: ['tsu', 'tu'], type: '平假名' },
    { kana: 'て', romaji: ['te'], type: '平假名' },
    { kana: 'と', romaji: ['to'], type: '平假名' },
    { kana: 'な', romaji: ['na'], type: '平假名' },
    { kana: 'に', romaji: ['ni'], type: '平假名' },
    { kana: 'ぬ', romaji: ['nu'], type: '平假名' },
    { kana: 'ね', romaji: ['ne'], type: '平假名' },
    { kana: 'の', romaji: ['no'], type: '平假名' },
    { kana: 'は', romaji: ['ha'], type: '平假名' },
    { kana: 'ひ', romaji: ['hi'], type: '平假名' },
    { kana: 'ふ', romaji: ['fu', 'hu'], type: '平假名' },
    { kana: 'へ', romaji: ['he'], type: '平假名' },
    { kana: 'ほ', romaji: ['ho'], type: '平假名' },
    { kana: 'ま', romaji: ['ma'], type: '平假名' },
    { kana: 'み', romaji: ['mi'], type: '平假名' },
    { kana: 'む', romaji: ['mu'], type: '平假名' },
    { kana: 'め', romaji: ['me'], type: '平假名' },
    { kana: 'も', romaji: ['mo'], type: '平假名' },
    { kana: 'や', romaji: ['ya'], type: '平假名' },
    { kana: 'ゆ', romaji: ['yu'], type: '平假名' },
    { kana: 'よ', romaji: ['yo'], type: '平假名' },
    { kana: 'ら', romaji: ['ra'], type: '平假名' },
    { kana: 'り', romaji: ['ri'], type: '平假名' },
    { kana: 'る', romaji: ['ru'], type: '平假名' },
    { kana: 'れ', romaji: ['re'], type: '平假名' },
    { kana: 'ろ', romaji: ['ro'], type: '平假名' },
    { kana: 'わ', romaji: ['wa'], type: '平假名' },
    { kana: 'を', romaji: ['wo', 'o'], type: '平假名' },
    { kana: 'ん', romaji: ['n'], type: '平假名' },
    { kana: 'ア', romaji: ['a'], type: '片假名' },
    { kana: 'イ', romaji: ['i'], type: '片假名' },
    { kana: 'ウ', romaji: ['u'], type: '片假名' },
    { kana: 'エ', romaji: ['e'], type: '片假名' },
    { kana: 'オ', romaji: ['o'], type: '片假名' },
    { kana: 'カ', romaji: ['ka'], type: '片假名' },
    { kana: 'キ', romaji: ['ki'], type: '片假名' },
    { kana: 'ク', romaji: ['ku'], type: '片假名' },
    { kana: 'ケ', romaji: ['ke'], type: '片假名' },
    { kana: 'コ', romaji: ['ko'], type: '片假名' },
    { kana: 'サ', romaji: ['sa'], type: '片假名' },
    { kana: 'シ', romaji: ['shi', 'si'], type: '片假名' },
    { kana: 'ス', romaji: ['su'], type: '片假名' },
    { kana: 'セ', romaji: ['se'], type: '片假名' },
    { kana: 'ソ', romaji: ['so'], type: '片假名' },
    { kana: 'タ', romaji: ['ta'], type: '片假名' },
    { kana: 'チ', romaji: ['chi', 'ti'], type: '片假名' },
    { kana: 'ツ', romaji: ['tsu', 'tu'], type: '片假名' },
    { kana: 'テ', romaji: ['te'], type: '片假名' },
    { kana: 'ト', romaji: ['to'], type: '片假名' },
    { kana: 'ナ', romaji: ['na'], type: '片假名' },
    { kana: 'ニ', romaji: ['ni'], type: '片假名' },
    { kana: 'ヌ', romaji: ['nu'], type: '片假名' },
    { kana: 'ネ', romaji: ['ne'], type: '片假名' },
    { kana: 'ノ', romaji: ['no'], type: '片假名' },
    { kana: 'ハ', romaji: ['ha'], type: '片假名' },
    { kana: 'ヒ', romaji: ['hi'], type: '片假名' },
    { kana: 'フ', romaji: ['fu', 'hu'], type: '片假名' },
    { kana: 'ヘ', romaji: ['he'], type: '片假名' },
    { kana: 'ホ', romaji: ['ho'], type: '片假名' },
    { kana: 'マ', romaji: ['ma'], type: '片假名' },
    { kana: 'ミ', romaji: ['mi'], type: '片假名' },
    { kana: 'ム', romaji: ['mu'], type: '片假名' },
    { kana: 'メ', romaji: ['me'], type: '片假名' },
    { kana: 'モ', romaji: ['mo'], type: '片假名' },
    { kana: 'ヤ', romaji: ['ya'], type: '片假名' },
    { kana: 'ユ', romaji: ['yu'], type: '片假名' },
    { kana: 'ヨ', romaji: ['yo'], type: '片假名' },
    { kana: 'ラ', romaji: ['ra'], type: '片假名' },
    { kana: 'リ', romaji: ['ri'], type: '片假名' },
    { kana: 'ル', romaji: ['ru'], type: '片假名' },
    { kana: 'レ', romaji: ['re'], type: '片假名' },
    { kana: 'ロ', romaji: ['ro'], type: '片假名' },
    { kana: 'ワ', romaji: ['wa'], type: '片假名' },
    { kana: 'ヲ', romaji: ['wo', 'o'], type: '片假名' },
    { kana: 'ン', romaji: ['n'], type: '片假名' }
  ]

  const [showHiragana, setShowHiragana] = useState(true)
  const [showKatakana, setShowKatakana] = useState(true)
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('輸入對應的羅馬拼音後按 Enter')
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [streak, setStreak] = useState(0)
  const inputRef = useRef(null)

  const availableKana = useMemo(() => {
    return kanaList.filter(
      (k) =>
        (showHiragana && k.type === '平假名') ||
        (showKatakana && k.type === '片假名')
    )
  }, [showHiragana, showKatakana])

  const randomQuestion = (excludeKana = null, pool = availableKana) => {
    if (pool.length === 0) return null
    const filtered = pool.filter((item) => item.kana !== excludeKana)
    const source = filtered.length > 0 ? filtered : pool
    return source[Math.floor(Math.random() * source.length)]
  }

  const [current, setCurrent] = useState(() => randomQuestion(null, kanaList))

  useEffect(() => {
    setCurrent(randomQuestion())
    setInput('')
    setMessage(
      availableKana.length === 0
        ? '請至少選擇一種題型'
        : '輸入對應的羅馬拼音後按 Enter'
    )
    inputRef.current?.focus()
  }, [availableKana])

  const nextQuestion = () => {
    setCurrent((prev) => randomQuestion(prev?.kana))
    setInput('')
    inputRef.current?.focus()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!current) return

    const answer = input.trim().toLowerCase()
    if (!answer) return

    setTotal((prev) => prev + 1)

    if (current.romaji.includes(answer)) {
      setScore((prev) => prev + 1)
      setStreak((prev) => prev + 1)
      setMessage(`✅ 正確！${current.kana} = ${current.romaji[0]}`)
      setTimeout(() => {
        nextQuestion()
        setMessage('輸入對應的羅馬拼音後按 Enter')
      }, 500)
    } else {
      setStreak(0)
      setMessage(
        `❌ 錯了，${current.kana} 的答案是 ${current.romaji.join(' / ')}`
      )
      setInput('')
      inputRef.current?.focus()
    }
  }

  const accuracy = total === 0 ? 0 : Math.round((score / total) * 100)

  const styles = {
    page: {
      minHeight: '100vh',
      margin: 0,
      padding: '24px',
      background:
        'linear-gradient(135deg, #eef2ff 0%, #f8fafc 50%, #e0f2fe 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily:
        'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      boxSizing: 'border-box'
    },
    card: {
      width: '100%',
      maxWidth: '720px',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: '28px',
      padding: '32px',
      boxShadow: '0 20px 60px rgba(15, 23, 42, 0.12)',
      border: '1px solid rgba(255,255,255,0.7)'
    },
    title: {
      fontSize: '32px',
      fontWeight: 800,
      color: '#0f172a',
      margin: 0,
      textAlign: 'center'
    },
    subtitle: {
      marginTop: '10px',
      marginBottom: '24px',
      textAlign: 'center',
      color: '#475569',
      fontSize: '15px'
    },
    filterRow: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      marginBottom: '20px',
      justifyContent: 'center'
    },
    filterLabel: (checked) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
      borderRadius: '999px',
      background: checked ? '#0f172a' : '#e2e8f0',
      color: checked ? '#ffffff' : '#334155',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      userSelect: 'none'
    }),
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '12px',
      marginBottom: '20px'
    },
    statCard: {
      background: '#f8fafc',
      borderRadius: '18px',
      padding: '16px',
      textAlign: 'center',
      border: '1px solid #e2e8f0'
    },
    statLabel: {
      fontSize: '13px',
      color: '#64748b',
      marginBottom: '6px'
    },
    statValue: {
      fontSize: '28px',
      fontWeight: 800,
      color: '#0f172a'
    },
    questionBox: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      borderRadius: '28px',
      padding: '32px 20px',
      textAlign: 'center',
      color: '#ffffff',
      marginBottom: '20px',
      boxShadow: '0 14px 36px rgba(15, 23, 42, 0.22)'
    },
    questionType: {
      fontSize: '13px',
      letterSpacing: '0.18em',
      color: '#93c5fd',
      marginBottom: '10px'
    },
    kana: {
      fontSize: '112px',
      lineHeight: 1,
      fontWeight: 800,
      margin: '12px 0'
    },
    streak: {
      color: '#cbd5e1',
      fontSize: '15px',
      marginTop: '10px'
    },
    emptyBox: {
      background: '#fff7ed',
      color: '#9a3412',
      border: '1px solid #fdba74',
      borderRadius: '20px',
      padding: '18px',
      textAlign: 'center',
      fontWeight: 700,
      marginBottom: '20px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    },
    input: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '16px 18px',
      fontSize: '18px',
      borderRadius: '18px',
      border: '1px solid #cbd5e1',
      outline: 'none',
      background: '#ffffff'
    },
    buttonRow: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    },
    primaryButton: {
      flex: 1,
      minWidth: '140px',
      padding: '14px 18px',
      borderRadius: '18px',
      border: 'none',
      background: '#2563eb',
      color: '#ffffff',
      fontSize: '16px',
      fontWeight: 700,
      cursor: 'pointer',
      boxShadow: '0 10px 24px rgba(37, 99, 235, 0.22)'
    },
    secondaryButton: {
      flex: 1,
      minWidth: '140px',
      padding: '14px 18px',
      borderRadius: '18px',
      border: '1px solid #cbd5e1',
      background: '#f8fafc',
      color: '#0f172a',
      fontSize: '16px',
      fontWeight: 700,
      cursor: 'pointer'
    },
    message: {
      marginTop: '18px',
      minHeight: '56px',
      borderRadius: '18px',
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      color: '#334155',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 16px',
      fontWeight: 600
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>五十音練習機</h1>
        <p style={styles.subtitle}>
          隨機出題，輸入正確羅馬拼音後自動進入下一題
        </p>

        <div style={styles.filterRow}>
          <label style={styles.filterLabel(showHiragana)}>
            <input
              type='checkbox'
              checked={showHiragana}
              onChange={() => setShowHiragana((v) => !v)}
            />
            平假名
          </label>

          <label style={styles.filterLabel(showKatakana)}>
            <input
              type='checkbox'
              checked={showKatakana}
              onChange={() => setShowKatakana((v) => !v)}
            />
            片假名
          </label>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>答對</div>
            <div style={styles.statValue}>{score}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>總題數</div>
            <div style={styles.statValue}>{total}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>正確率</div>
            <div style={styles.statValue}>{accuracy}%</div>
          </div>
        </div>

        {!current ? (
          <div style={styles.emptyBox}>⚠️ 請至少選擇一種題型</div>
        ) : (
          <>
            <div style={styles.questionBox}>
              <div style={styles.questionType}>{current.type}</div>
              <div style={styles.kana}>{current.kana}</div>
              <div style={styles.streak}>目前連對：{streak}</div>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='請輸入羅馬拼音，例如 shi'
                style={styles.input}
                autoComplete='off'
                autoCapitalize='none'
                autoCorrect='off'
                spellCheck={false}
              />

              <div style={styles.buttonRow}>
                <button type='submit' style={styles.primaryButton}>
                  送出答案
                </button>
                <button
                  type='button'
                  style={styles.secondaryButton}
                  onClick={() => {
                    setMessage(
                      `提示：${current.kana} 的答案是 ${current.romaji.join(' / ')}`
                    )
                    setStreak(0)
                    inputRef.current?.focus()
                  }}
                >
                  看答案
                </button>
                <button
                  type='button'
                  style={styles.secondaryButton}
                  onClick={nextQuestion}
                >
                  跳過
                </button>
              </div>
            </form>
          </>
        )}

        <div style={styles.message}>{message}</div>
      </div>
    </div>
  )
}
