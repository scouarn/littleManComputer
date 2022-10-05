
SVG_FILES := $(wildcard figures/*.svg)
PDF_FILES := $(patsubst %.svg, %.pdf, $(SVG_FILES))

PDF := ../littleManComputer.pdf

all: $(PDF_FILES)
	pdflatex -shell-escape main.tex
	mv main.pdf $(PDF)
	evince $(PDF)

%.pdf : %.svg
	inkscape $<  -o $@ --export-type=pdf

clean:
	-rm *.toc *.nav *.log *.snm *.out *.aux
	-rm figs/*.pdf_tex figs/*.pdf
