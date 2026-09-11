/**
 * components/footer.js
 * -----------------------------------------------------------------------
 * Responsabilidade única: montar o rodapé, incluindo o bloco obrigatório
 * com nome do curso, disciplina, turma e integrantes do grupo.
 * -----------------------------------------------------------------------
 */
import { el, qs } from '../core/dom.js';
import { SITE_NAME, COURSE_INFO, NAV_ITEMS } from '../core/constants.js';

export function renderFooter(mountSelector = '#site-footer') {
  const mount = qs(mountSelector);
  if (!mount) return;

  const quickLinks = el('ul', {}, NAV_ITEMS.slice(0, 6).map(i =>
    el('li', {}, [el('a', { href: i.href }, i.label)])
  ));

  const footer = el('footer', { class: 'site-footer' }, [
    el('div', { class: 'wrap' }, [
      el('div', { class: 'foot-grid' }, [
        el('div', {}, [
          el('h4', {}, `${SITE_NAME} — carros, peças e acessórios`),
          el('p', { style: 'max-width:46ch;color:#9a9ea7;' },
            'Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento Web, com fins didáticos.'),
        ]),
        el('div', {}, [
          el('h4', {}, 'Navegação'),
          quickLinks,
        ]),
      ]),
      el('div', { class: 'foot-meta' }, [
        el('p', {}, [el('strong', {}, 'Curso: '), COURSE_INFO.curso]),
        el('p', {}, [el('strong', {}, 'Disciplina: '), COURSE_INFO.disciplina]),
        el('p', {}, [el('strong', {}, 'Turma: '), COURSE_INFO.turma]),
        el('p', {}, [el('strong', {}, 'Integrantes: '), COURSE_INFO.integrantes.join(', ')]),
      ]),
    ]),
  ]);

  mount.replaceWith(footer);
  footer.id = 'site-footer';
}
