# LIB: translation info (CLI and Editor)

When a translation file is opened it can be used alone to finish current translation, text from original file is included with all sections at last updated revision with the checksum and id. That way if section in original changes later, we know that translation needs to be updated. 



However, the original should be analysed as well to check if sections in the original have changed in the meantime.

Convention to describe sections being compared

- **base** - section in the original file with latest text
- **copy** - section copied from original, that is basis for translation, can be same as `base` but also can be out of date and in need for sync
- **trans** - translation of the **copy**

in case that translation has malformed data by not having both **copy** and **trans** it can be fixed automatically.

- if **trans** is missing it can be added by initializing the section (if `base!=copy` **base** is used)
- if **copy** is missing it can be added by initializing the section from **base** and marking as **translated-dirty** `trans=0%`



## Case 1 `missing-translation`

- **base** exists ---- missing **copy** and **trans**

A new section was added to base file that is not present in translation file

## Case 2 `missing-original`

- **base** missing --- **trans** exists 
  -  translation has new unmarked section, this should be handled by creating a section in base file and initializing the both. This is a very special case when users mistakenly add content to some language before adding to base. 
- **base** missing --- **trans** exists with UUID
  - translation has a section with UUID but is no longer present in base. user can choose to bring back the section to base somehow, or delete the section in translation document.

In both cases of restoring, **base** sould be marked as not translated `{..."source":"trans.file.name.md", "trans":"0%"...}`. 

## Case 3 - `initialized` (needs to be translated)

- **base == copy** && **copy == trans**

This initial situation when translation file is generated and translations not started yet

## Case 4 - `initialized-dirty` (can auto fix)

- **base != copy** && **copy == trans**

This initial situation when translation file is generated and translations not started yet, but in the meantime original has already changed.

This can be auto-fixed because not translation is done yet by updating `copy` to get back to **initialized** state.

## Case 5 - `partial` (finish translating)

- **base==copy** && **copy percent% trans**

Text is only partially translated. This can not be recognized automatically, but must be marked by user in the JSON data via `"trans":"50%"`

## Case 6 - `partial-dirty` (finish translating + use diff)

- **base != copy** && **copy percent% trans**

Marked by user  as partially translated, but also in the meantime original has changed.

This is handled the same way as **translated-dirty** because it does not matter how much is translated, user must finish the translation manually(see: Case 7).

## Case 7 - `translated-dirty` (translate again + use diff)

- **base != copy** && **copy 100% trans**

Original has changed since translation was done.

It does not matter how much is translated, user must finish the translation manually. Editor should display diff for `base/copy` so translator can focus on the changes. It could be that a typo is fixed in the original, and the translation is ok without changing at all. It could be few sentences were changed or added, and the editor can help the user focus on changes by displaying the diff.

## Case 8 - `translated` 

When translated completely and up-to-date.

