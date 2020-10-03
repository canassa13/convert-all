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
  Stack
} from '@chakra-ui/core'
import Header from '../components/Header'

const Home: React.FC = () => {
  const [textValue, setTextValue] = useState('')

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
      <Header />
      <Flex
        flex="1"
        p={3}
        flexDirection="column"
        h="calc(100vh - 80px)"
        bg="gray.900"
        align="center"
      >
        <Flex
          as="main"
          w={'80%'}
          maxW="1280px"
          align="center"
          justify="center"
          flex={1}
        >
          <Flex
            maxW="1000px"
            flex={1}
            flexDirection="column"
            bg="gray.800"
            borderRadius={5}
            h={'500px'}
            paddingX={8}
            justify="center"
          >
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
                color="gray.200"
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
