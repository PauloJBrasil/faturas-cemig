import PyPDF2

class Reader:

    @classmethod
    def read(cls, path):
        reader = PyPDF2.PdfReader(path)
        return reader