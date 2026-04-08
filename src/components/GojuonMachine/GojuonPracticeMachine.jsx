import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import styles from './GojuonPracticeMachine.module.css'
import { KANA_LIST } from './kanaData'

export default function GojuonPracticeMachine() {
  const [showHiragana, setShowHiragana] = useState(true)
  const [showKatakana, setShowKatakana] = useState(true)
  const [showSeion, setShowSeion] = useState(true)
  const [showDakuon, setShowDakuon] = useState(true)
  const [showHandakuon, setShowHandakuon] = useState(true)
  const [showYouon, setShowYouon] = useState(true)
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('輸入對應的羅馬拼音後按 Enter')
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [streak, setStreak] = useState(0)
  const inputRef = useRef(null)

  const availableKana = useMemo(() => {
    return KANA_LIST.filter((k) => {
      const typeMatched =
        (showHiragana && k.type === '平假名') ||
        (showKatakana && k.type === '片假名')

      const groupMatched =
        (showSeion && k.group === '清音') ||
        (showDakuon && k.group === '濁音') ||
        (showHandakuon && k.group === '半濁音') ||
        (showYouon && k.group === '拗音')

      return typeMatched && groupMatched
    })
  }, [
    showHiragana,
    showKatakana,
    showSeion,
    showDakuon,
    showHandakuon,
    showYouon
  ])

  const randomQuestion = useCallback(
    (excludeKana = null, pool = availableKana) => {
      if (pool.length === 0) return null
      const filtered = pool.filter((item) => item.kana !== excludeKana)
      const source = filtered.length > 0 ? filtered : pool
      return source[Math.floor(Math.random() * source.length)]
    },
    [availableKana]
  )

  const [current, setCurrent] = useState(() => randomQuestion(null, KANA_LIST))

  useEffect(() => {
    setCurrent(randomQuestion())
    setInput('')
    setMessage(
      availableKana.length === 0
        ? '請至少選擇一種字型與音類'
        : '輸入對應的羅馬拼音後按 Enter'
    )
    inputRef.current?.focus()
  }, [availableKana, randomQuestion])

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

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>五十音練習機</h1>
        <p className={styles.subtitle}>
          隨機出題，輸入正確羅馬拼音後自動進入下一題
        </p>

        <div className={styles.filterSection}>
          <div className={styles.filterGroupTitle}>字體</div>
          <div className={styles.filterRow}>
            <label
              className={`${styles.filterChip} ${
                showHiragana ? styles.filterChipPrimaryActive : ''
              }`}
            >
              <input
                type='checkbox'
                checked={showHiragana}
                onChange={() => setShowHiragana((v) => !v)}
              />
              平假名
            </label>

            <label
              className={`${styles.filterChip} ${
                showKatakana ? styles.filterChipPrimaryActive : ''
              }`}
            >
              <input
                type='checkbox'
                checked={showKatakana}
                onChange={() => setShowKatakana((v) => !v)}
              />
              片假名
            </label>
          </div>
        </div>

        <div className={styles.filterSection}>
          <div className={styles.filterGroupTitle}>音類</div>
          <div className={styles.filterRow}>
            <label
              className={`${styles.filterChip} ${
                showSeion ? styles.filterChipSecondaryActive : ''
              }`}
            >
              <input
                type='checkbox'
                checked={showSeion}
                onChange={() => setShowSeion((v) => !v)}
              />
              清音
            </label>

            <label
              className={`${styles.filterChip} ${
                showDakuon ? styles.filterChipSecondaryActive : ''
              }`}
            >
              <input
                type='checkbox'
                checked={showDakuon}
                onChange={() => setShowDakuon((v) => !v)}
              />
              濁音
            </label>

            <label
              className={`${styles.filterChip} ${
                showHandakuon ? styles.filterChipSecondaryActive : ''
              }`}
            >
              <input
                type='checkbox'
                checked={showHandakuon}
                onChange={() => setShowHandakuon((v) => !v)}
              />
              半濁音
            </label>

            <label
              className={`${styles.filterChip} ${
                showYouon ? styles.filterChipSecondaryActive : ''
              }`}
            >
              <input
                type='checkbox'
                checked={showYouon}
                onChange={() => setShowYouon((v) => !v)}
              />
              拗音
            </label>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>答對</div>
            <div className={styles.statValue}>{score}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>總題數</div>
            <div className={styles.statValue}>{total}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>正確率</div>
            <div className={styles.statValue}>{accuracy}%</div>
          </div>
        </div>

        {!current ? (
          <div className={styles.emptyBox}>⚠️ 請至少選擇一種字型與音類</div>
        ) : (
          <>
            <div className={styles.questionBox}>
              <div className={styles.questionType}>
                {current.type}・{current.group}
              </div>
              <div className={styles.kana}>{current.kana}</div>
              <div className={styles.streakText}>目前連對：{streak}</div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                ref={inputRef}
                className={styles.inputField}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='請輸入羅馬拼音，例如 shi'
                autoComplete='off'
                autoCapitalize='none'
                autoCorrect='off'
                spellCheck={false}
              />

              <div className={styles.buttonRow}>
                <button type='submit' className={styles.primaryButton}>
                  送出答案
                </button>
                <button
                  type='button'
                  className={styles.secondaryButton}
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
                  className={styles.secondaryButton}
                  onClick={nextQuestion}
                >
                  跳過
                </button>
              </div>
            </form>
          </>
        )}

        <div className={styles.messageBox}>{message}</div>
      </div>
    </div>
  )
}
