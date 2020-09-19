import React, { memo, useState, useCallback, ChangeEvent, useMemo } from 'react'
import { saveAs } from 'file-saver'
import {
  Grid,
  Flex,
  Textarea,
  RadioGroup,
  Radio,
  Box,
  Button
} from '@chakra-ui/core'

const Home: React.FC = () => {
  const [textValue, setTextValue] = useState('')

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
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
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      const callFunction = handlers[value]
      if (callFunction) {
        callFunction()
      }
    },
    [handlers]
  )

  return (
    <Box height="100vh" p={2}>
      <Grid
        as="main"
        templateColumns="1fr 800px 1fr"
        templateRows="1fr 1fr 1fr"
        templateAreas="
        '. . .'
        '. text .'
        '. button .'
        "
        justifyContent="center"
        alignItems="center"
      >
        <Flex gridArea="text" alignItems="center" flexDirection="column">
          <RadioGroup
            variantColor="purple"
            isInline
            spacing={5}
            onChange={handleResizeChange}
            mb={6}
          >
            <Radio value="upperCase">Upper Case</Radio>
            <Radio value="lowerCase">Lower Case</Radio>
            <Radio value="reverse">Reverse</Radio>
            <Radio value="sentence">Sentence</Radio>
            <Radio value="capitalize">Capitalize</Radio>
          </RadioGroup>
          <Textarea
            value={textValue}
            onChange={handleInputChange}
            placeholder="Start typing..."
            size="lg"
          />
        </Flex>
        <Button
          gridArea="button"
          variantColor="purple"
          onClick={() => handleDownload()}
        >
          Download Text
        </Button>
      </Grid>
    </Box>
  )
}

export default memo(Home)
