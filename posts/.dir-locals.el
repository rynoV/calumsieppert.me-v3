;;; Directory Local Variables
;;; For more information see (info "(emacs) Directory Variables")

((org-mode
  ;; From https://stackoverflow.com/a/30449992 for markdown frontmatter
  (eval . (defun org-babel-execute:yaml (body params) body))
  ;; (eval . (set-input-method "french-prefix"))
  ))
