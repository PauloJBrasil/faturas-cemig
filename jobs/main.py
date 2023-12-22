from reader import Reader
from prisma import Prisma
import os
import asyncio
import re

class Main:
    @classmethod
    async def main(cls):
        db = Prisma()
        await db.connect()
        
        faturas = []

        for (dirname, dirs, files) in os.walk('../faturas-aqui'):
            for filename in files:
                if filename.endswith('.pdf'):
                    thefile = os.path.join(dirname,filename)

                    reader = Reader.read(thefile)
                    lines = reader.pages[0].extract_text().splitlines()
                    
                    numCliente = [i for i, item in enumerate(lines) if re.search('Nº DO CLIENTE', item)][0]
                    referenteMesAno = [i for i, item in enumerate(lines) if re.search('Referente a', item)][0]
                    energia = [i for i, item in enumerate(lines) if re.search('Energia Elétrica', item)][0]
                    energiaScee = [i for i, item in enumerate(lines) if re.search('Energia SCEE s/ ICMS', item)][0]
                    energiaCompensada = [i for i, item in enumerate(lines) if re.search('Energia compensada GD I', item)][0]
                    ilumPublica = [i for i, item in enumerate(lines) if re.search('Contrib Ilum Publica Municipal', item)][0]

                    faturas.append({
                        'mesAnoReferencia': lines[referenteMesAno + 1].split()[0],
                        'numeroCliente': int(lines[numCliente + 1].split()[0]),
                        'energiaEletricaQtd': int(lines[energia].split()[3].replace('.', '')),
                        'energiaEletricaValor': float(lines[energia].split()[5].replace('.', '').replace(',', '.')),
                        'energiaSceeQtd': int(lines[energiaScee].split()[5].replace('.', '')),
                        'energiaSceeValor': float(lines[energiaScee].split()[7].replace('.', '').replace(',', '.')),
                        'energiaCompensadaQtd': int(lines[energiaCompensada].split()[5].replace('.', '')),
                        'energiaCompensadaValor': float(lines[energiaCompensada].split()[7].replace('.', '').replace(',', '.')),
                        'ilumPublica': float(lines[ilumPublica].split()[4].replace('.', '').replace(',', '.'))
                    })

        post = await db.fatura.create_many(
            data=faturas,
            skip_duplicates=True
        )

        print(post)
        await db.disconnect()
        
if __name__ == "__main__":
    asyncio.run(Main.main())