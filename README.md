# Pandasale

## Create Drop

Input format (Images)
Images should be named in alphabetical order. For example `a.jpg`, `b.jpg`, and so on.  
Or numerical order is preferred. `1.jpg`, `2.jpg`, and so on. This allows proper mapping for metadata to images. Meaning that `1.jpg` gets mapped to 1st metadata

Input format (Metadata.json)
| Input | Format |
|-----------------|-------------------|
| Collection Name | Text |
| Symbol | Text |
| Metadata | JSON File (Array) |
| NFT Images | Any Images |

**Note:** Number of NFT images must equal the number of objects in Metadata JSON Array

For example we upload 3 images then our json array should look like this:

```
[
  { "name": "Monkey One", "description": "Description one..." },
  { "name": "Monkey Two", "description": "Description two..." },
  { "name": "Monkey Three", "description": "Description three..." }
]
```

Or you can specify attributes (traits) in opensea metadata standard

```
[
  {
    "name": "Monkey One",
    "description": "Description one...",
    "attributes": [
      {
        "trait_type": "Base",
        "value": "Starfish"
      },
      {
        "trait_type": "Eyes",
        "value": "Big"
      },
      {
        "trait_type": "Mouth",
        "value": "Surprised"
      },
      {
        "trait_type": "Level",
        "value": 5
      },
      {
        "trait_type": "Stamina",
        "value": 1.4
      }
    ]
  },
  {
    "name": "Monkey Two",
    "description": "Description two...",
    "attributes": [
      {
        "trait_type": "Personality",
        "value": "Sad"
      },
      {
        "display_type": "boost_number",
        "trait_type": "Aqua Power",
        "value": 40
      }
    ]
  },
  {
    "name": "Monkey Three",
    "description": "Description three...",
    "attributes": [
      {
        "display_type": "boost_percentage",
        "trait_type": "Stamina Increase",
        "value": 10
      },
      {
        "display_type": "number",
        "trait_type": "Generation",
        "value": 2
      }
    ]
  }
]

```
