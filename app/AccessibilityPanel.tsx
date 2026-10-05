import { Accessibility, Check, RotateCcw } from "lucide-react";
import Modal from "./Modal";
export type Preferences = { scale: number; contrast: boolean; motion: boolean };
export default function AccessibilityPanel({
  open,
  onClose,
  value,
  onChange,
}: {
  open: boolean;
  onClose: () => void;
  value: Preferences;
  onChange: (value: Preferences) => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Adapta tu experiencia"
      className="accessibility-modal"
    >
      <p className="modal-intro">
        Elige cómo prefieres leer y navegar. Tus ajustes se guardan en este
        navegador.
      </p>
      <fieldset className="preference-group">
        <legend>Tamaño del texto</legend>
        <div className="size-options">
          {[100, 125, 150].map((scale) => (
            <button
              key={scale}
              aria-pressed={value.scale === scale}
              onClick={() => onChange({ ...value, scale })}
            >
              {scale}%
              {scale === value.scale && <Check size={17} aria-hidden="true" />}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="preference-toggle">
        <span>
          <strong>Contraste reforzado</strong>
          <small>Fondos sólidos y bordes más definidos.</small>
        </span>
        <input
          type="checkbox"
          checked={value.contrast}
          onChange={(e) => onChange({ ...value, contrast: e.target.checked })}
        />
      </label>
      <label className="preference-toggle">
        <span>
          <strong>Reducir movimiento</strong>
          <small>Desactiva las transiciones y animaciones.</small>
        </span>
        <input
          type="checkbox"
          checked={value.motion}
          onChange={(e) => onChange({ ...value, motion: e.target.checked })}
        />
      </label>
      <div className="keyboard-note">
        <Accessibility size={24} aria-hidden="true" />
        <p>
          Usa <kbd>Tab</kbd> para recorrer los controles y <kbd>Esc</kbd> para
          cerrar este panel.
        </p>
      </div>
      <button
        className="text-button"
        onClick={() => onChange({ scale: 100, contrast: false, motion: false })}
      >
        <RotateCcw size={17} aria-hidden="true" />
        Restablecer ajustes
      </button>
    </Modal>
  );
}
