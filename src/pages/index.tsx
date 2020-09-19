import React, { memo, useState, useCallback, ChangeEvent, useMemo } from 'react'
import { saveAs } from 'file-saver'
import {
  Grid,
  Flex,
  Textarea,
  RadioGroup,
  Radio,
  Box,
  Button,
  Text
} from '@chakra-ui/core'
import { AiFillHeart as HeartIcon } from 'react-icons/ai'

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
    <Box as="main" height="100vh" p={2}>
      <Grid
        templateColumns="1fr 800px 1fr"
        templateRows="1fr 1fr 1fr"
        templateAreas="
        '. . .'
        '. text .'
        '. . footer'
        "
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Flex gridArea="text" alignItems="center" flexDirection="column">
          <RadioGroup
            variantColor="purple"
            isInline
            spacing={5}
            onChange={handleResizeChange}
          >
            <Radio value="upperCase">Upper Case</Radio>
            <Radio value="lowerCase">Lower Case</Radio>
            <Radio value="reverse">Reverse</Radio>
            <Radio value="sentence">Sentence</Radio>
            <Radio value="capitalize">Capitalize</Radio>
          </RadioGroup>
          <Textarea
            margin={3}
            value={textValue}
            onChange={handleInputChange}
            placeholder="Start typing..."
          />
          <Flex width="100%" justifyContent="flex-end">
            <Button variantColor="purple" onClick={() => handleDownload()}>
              Download Text
            </Button>
          </Flex>
        </Flex>
        <Flex
          height="100%"
          gridArea="footer"
          alignItems="flex-end"
          justifyContent="flex-end"
        >
          <Box d="flex" alignItems="center">
            <Text>Made with </Text>
            <HeartIcon size={32} color="red" />
            <Text whiteSpace="nowrap">
              by <b>Pedro</b>
            </Text>
          </Box>
        </Flex>
      </Grid>
    </Box>
  )
}

export default memo(Home)
