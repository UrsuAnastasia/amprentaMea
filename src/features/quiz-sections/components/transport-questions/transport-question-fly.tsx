import { Button } from 'common/components/Button/Button'
import { CheckBoxItem } from 'common/components/CheckBox/CheckBox'
import { DropeDown } from 'common/components/DropeDown/DropeDown'
import { UpArrow } from 'features/quiz-sections/assets/icons/UpArrow'
import { answears, orase, question, stepperStyle } from 'features/quiz-sections/constants/constants'
import { Car, Fly } from 'features/quiz-sections/models/transport-models'
import { DownArrow } from 'features/quiz/assets/icons/DownArrow'
import React, { useEffect, useState } from 'react'
import { Stepper } from 'react-form-stepper'
import { ModalSection } from '../modal-section.tsx/modal-section'
import { TransportBus } from './transport-question-bus'
import style from './transport-question.module.scss'

interface Props {
  arrayOfCars: Array<Car>
}
export const TransportFly: React.FC<Props> = ({ ...props }) => {
  const [showBusQuestion, setShowBusQuestion] = useState<boolean>(false)
  const [checked, setChecked] = React.useState<string>('')
  const [stepNumber, setStepNumber] = useState<number>(1)
  const [newFly, setNewFly] = useState<boolean | undefined>(undefined)
  const [multipleFly, setMultipleFly] = useState<Array<Fly>>([])
  const [fly, setFly] = useState<Fly>({
    from: '',
    to: '',
  })
  useEffect(() => {
    setChecked('')
    setNewFly(undefined)
  }, [stepNumber])

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setChecked(value)
    if (value === 'Da') {
      setNewFly(true)
    }
    if (value === 'Nu') {
      setNewFly(false)
    }
  }
  const handleChangeDropeDown = (event: any) => {
    const { name, value } = event.target
    setFly({ ...fly!, [name]: value })
  }
  useEffect(() => {
    if (stepNumber === 1 && newFly === false) {
      setShowBusQuestion(true)
    } else {
      setShowBusQuestion(false)
    }
  }, [checked, stepNumber])

  function getStepContent(step: number) {
    switch (step) {
      case 1:
        return (
          <div className={style.transportQuestion_QuestionContainer}>
            {question(
              1,
              'Ai zburat cu avionul în ultima lună?',
              <CheckBoxItem cheked={checked} onChange={handleCheckbox} answears={answears} />,
            )}
          </div>
        )
      case 2:
        return (
          <div className={style.transportQuestion_QuestionContainer}>
            {question(
              2,
              'Care este orașul de plecare? ',
              <DropeDown
                name='from'
                placeholder={'Selectează carburant'}
                options={orase}
                onChange={handleChangeDropeDown}
              />,
            )}
          </div>
        )
      case 3:
        return (
          <div className={style.transportQuestion_QuestionContainer}>
            {question(
              3,
              'Care este orașul destinție?',
              <DropeDown
                name='to'
                placeholder={'Selectează carburant'}
                options={orase}
                onChange={handleChangeDropeDown}
              />,
            )}
          </div>
        )
      case 4:
        return (
          <div className={style.transportQuestion_QuestionContainer}>
            {question(
              4,
              'Mai ai un zbor cu avionul pe care vrei să-l adaugi?',
              <CheckBoxItem cheked={checked} onChange={handleCheckbox} answears={answears} />,
            )}
          </div>
        )
      default:
        return 'Unknown step'
    }
  }
  useEffect(() => {
    const newArray = [...multipleFly]
    newArray.push(fly)

    if (newFly === true && stepNumber === 4) {
      setMultipleFly(newArray)
      setStepNumber(2)
    }
    if (newFly === false && stepNumber === 4) {
      setMultipleFly(newArray)
      setShowBusQuestion(true)
    }
  }, [stepNumber, newFly])

  return (
    <ModalSection>
      <div className={style.transportQuestion}>
        <div className={style.transportQuestion_Body}>
          {showBusQuestion ? (
            <>
              <TransportBus multipleFly={multipleFly} arrayOfCars={props.arrayOfCars} />
            </>
          ) : (
            <>
              <Stepper
                steps={[{ label: '.' }, { label: '.' }, { label: '.' }, { label: '.' }]}
                className={style.transportQuestion_Stepper}
                connectorStyleConfig={{ activeColor: '#509046' }}
                styleConfig={stepperStyle}
                activeStep={stepNumber}></Stepper>{' '}
              <div>{getStepContent(stepNumber)}</div>
              <div className={style.transportQuestion_Footer}>
                <Button
                  onClick={() => {
                    if (stepNumber === 4 || newFly === false) {
                    } else {
                      setStepNumber(stepNumber + 1)
                    }
                  }}
                  className={style.transportQuestion_DownArrow}
                  icon={<DownArrow />}
                />
                <Button
                  onClick={() => {
                    setStepNumber(stepNumber - 1)
                  }}
                  disabled={stepNumber === 1 ? true : false}
                  className={style.transportQuestion_UpArrow}
                  icon={<UpArrow />}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </ModalSection>
  )
}