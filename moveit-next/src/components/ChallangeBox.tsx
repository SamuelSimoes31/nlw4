import styles from '../styles/components/ChallangeBox.module.css'

export function ChallangeBox(){
  return (
    <div className={styles.challangeBoxContainer}>
      { true ? (
          <div className={styles.challangeIsActive}>
            <header>Ganhe 400 xp</header>

            <main>
              <img src="icons/body.svg" alt=""/>
              <strong>Novo desafio</strong>
              <p>Levante e faça uma caminhada de 3 minutos</p>
            </main>
            
            <footer>
              <button
                type="button"
                className={styles.challangeFailedButton}
              >
                Falhei
              </button>
              <button
                type="button"
                className={styles.challangeSucceededButton}
              >
                Completei
              </button>
            </footer>
          </div>
        ) : (
        <div className={styles.challangeNotActive}>
          <strong>Finalize um ciuclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up"/>
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  )
}