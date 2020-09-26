import React, {
  memo,
  useState,
  useCallback,
  ChangeEvent,
  useMemo,
  ReactText
} from 'react'
import { saveAs } from 'file-saver'
import {
  Textarea,
  RadioGroup,
  Radio,
  Flex,
  Button,
  Stack,
  useColorMode
} from '@chakra-ui/core'
import Header from '../components/Header'

const Home: React.FC = () => {
  const [textValue, setTextValue] = useState('')
  const { colorMode, toggleColorMode } = useColorMode()

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setTextValue(event.target.value)
    },
    []
  )

  const handleUpperCase = useCallback(() => {
    setTextValue(previousValue => previousValue.toLocaleUpperCase())
  }, [])

  const handleLowerCase = useCallback(() => {
    setTextValue(previousValue => previousValue.toLocaleLowerCase())
  }, [])

  const handleReverse = useCallback(() => {
    setTextValue(previousValue => previousValue.split('').reverse().join(''))
  }, [])

  const handleSentence = useCallback(() => {
    setTextValue(
      previousValue =>
        previousValue.charAt(0).toLocaleUpperCase() + previousValue.slice(1)
    )
  }, [])

  const handleCapitalize = useCallback(() => {
    setTextValue(previousValue =>
      previousValue
        .split(' ')
        .map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1))
        .join(' ')
    )
  }, [])

  const handleDownload = useCallback(() => {
    const blob = new Blob([textValue], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, 'Converted.txt')
  }, [])

  const handlers = useMemo(
    () => ({
      upperCase: handleUpperCase,
      lowerCase: handleLowerCase,
      reverse: handleReverse,
      sentence: handleSentence,
      capitalize: handleCapitalize,
      download: handleDownload
    }),
    [handleUpperCase, handleLowerCase]
  )

  const handleResizeChange = useCallback(
    (value: ReactText) => {
      const callFunction = handlers[value]
      if (callFunction) {
        callFunction()
      }
    },
    [handlers]
  )

  return (
    <>
      <Header>Teste</Header>
      <Flex flex="1" maxW="1280px" p={3} flexDirection="column">
        <Flex w="full" justifyContent="flex-end">
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
        </Flex>
        <Flex as="main" alignItems="center" justifyContent="center" flex="1">
          <Flex w="80%" flexDirection="column">
            <Flex justifyContent="flex-end" pb={3}>
              <Button
                colorScheme="purple"
                onClick={() => handleDownload()}
                isDisabled={textValue.length === 0}
              >
                Download Text
              </Button>
            </Flex>
            <Textarea
              value={textValue}
              onChange={handleInputChange}
              placeholder="Start typing..."
            />
            <RadioGroup
              pt={3}
              colorScheme="purple"
              onChange={handleResizeChange}
            >
              <Stack
                spacing={0}
                direction="row"
                flexWrap="wrap"
                justify="space-between"
              >
                <Radio value="upperCase">Upper Case</Radio>
                <Radio value="lowerCase">Lower Case</Radio>
                <Radio value="reverse">Reverse</Radio>
                <Radio value="sentence">Sentence</Radio>
                <Radio value="capitalize">Capitalize</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default memo(Home)
