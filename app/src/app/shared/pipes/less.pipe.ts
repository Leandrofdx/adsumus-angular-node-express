import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'textLess'
})
export class TextLess implements PipeTransform {
    transform(texto: string, point: number): string {
        if (texto.length > point) {
            return texto.substr(0, point) + '... '
        }
        return texto
    }
}