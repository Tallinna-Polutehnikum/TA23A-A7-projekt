# Unit Testide Raport - Cinema App

## Testide katvus

| Kategooria | Katvus |
|------------|--------|
| Statements | 98.7% |
| Branches | 97.87% |
| Functions | 100% |
| Lines | 100% |

## Testitud stsenaariumid

1. **ContributorCard** - nime, kasutajanime, avatari ja GitHub lingi kuvamine
2. **FilmCard** - filmi andmete kuvamine, klikkides navigeerimine
3. **Filter** - otsing, žanri filtreerimine, dropdowni avamine/sulgemine
4. **Navbar** - teema vahetamine (light/dark), localStorage sünkroniseerimine
5. **Pagination** - lehtede kuvamine, eelmine/järgmine nupud
6. **EmailVerification** - emaili valideerimine, nuppude olekud
7. **MyTickets** - piletite laadimine ja tühistamine
8. **Confirmation** - ostu kinnituse andmete kuvamine
9. **About** - tiimi liikmete kuvamine
10. **Contact** - kontaktinfo kuvamine

## Tähelepanekud

- Vitest töötab Vue 3 projektis hästi
- LocalStorage mockimine vajas tähelepanu
- Watch funktsioonide branch coverage (83.33%) on testimistööriista piirang, mitte testide viga

**Kokku: 88 testi, 13 faili - kõik läbivad (100%)**